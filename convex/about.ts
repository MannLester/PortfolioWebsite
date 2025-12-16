import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get active about information
export const getActiveAbout = query({
  args: {},
  handler: async (ctx) => {
    const about = await ctx.db
      .query("about")
      .withIndex("by_active", (q) => q.eq("is_active", true))
      .first();
    return about;
  },
});

// Query to get all about entries (for admin)
export const getAllAbout = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("about").collect();
  },
});

// Query to get about by ID
export const getAbout = query({
  args: { id: v.id("about") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation to add new about entry
export const addAbout = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    highlights: v.array(v.string()),
    personality_traits: v.array(v.string()),
    career_focus: v.string(),
    is_active: v.boolean(),
    created_at: v.string(),
    updated_at: v.string(),
  },
  handler: async (ctx, args) => {
    // If this is being set as active, deactivate all others
    if (args.is_active) {
      const existingActive = await ctx.db
        .query("about")
        .withIndex("by_active", (q) => q.eq("is_active", true))
        .collect();
      
      for (const entry of existingActive) {
        await ctx.db.patch(entry._id, { is_active: false });
      }
    }
    
    return await ctx.db.insert("about", args);
  },
});

// Mutation to update about entry
export const updateAbout = mutation({
  args: {
    id: v.id("about"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    highlights: v.optional(v.array(v.string())),
    personality_traits: v.optional(v.array(v.string())),
    career_focus: v.optional(v.string()),
    is_active: v.optional(v.boolean()),
    updated_at: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // If this is being set as active, deactivate all others
    if (updates.is_active === true) {
      const existingActive = await ctx.db
        .query("about")
        .withIndex("by_active", (q) => q.eq("is_active", true))
        .collect();
      
      for (const entry of existingActive) {
        if (entry._id !== id) {
          await ctx.db.patch(entry._id, { is_active: false });
        }
      }
    }
    
    // Remove undefined values
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );
    
    return await ctx.db.patch(id, filteredUpdates);
  },
});

// Mutation to delete about entry
export const deleteAbout = mutation({
  args: { id: v.id("about") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Mutation to bulk add about entries
export const bulkAddAbout = mutation({
  args: {
    entries: v.array(v.object({
      title: v.string(),
      description: v.string(),
      highlights: v.array(v.string()),
      personality_traits: v.array(v.string()),
      career_focus: v.string(),
      is_active: v.boolean(),
      created_at: v.string(),
      updated_at: v.string(),
    }))
  },
  handler: async (ctx, args) => {
    // Deactivate all existing entries first
    const existingActive = await ctx.db
      .query("about")
      .withIndex("by_active", (q) => q.eq("is_active", true))
      .collect();
    
    for (const entry of existingActive) {
      await ctx.db.patch(entry._id, { is_active: false });
    }
    
    const results = [];
    for (const aboutEntry of args.entries) {
      const result = await ctx.db.insert("about", aboutEntry);
      results.push(result);
    }
    return results;
  },
});