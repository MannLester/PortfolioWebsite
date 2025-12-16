import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all affiliations ordered by order_index
export const getAllAffiliations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("affiliations")
      .withIndex("by_order")
      .collect();
  },
});

// Query to get featured affiliations only
export const getFeaturedAffiliations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("affiliations")
      .withIndex("by_featured", (q) => q.eq("is_featured", true))
      .collect();
  },
});

// Query to get affiliations by status
export const getAffiliationsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("affiliations")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

// Query to get affiliations by type
export const getAffiliationsByType = query({
  args: { type: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("affiliations")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .collect();
  },
});

// Mutation to add new affiliation
export const addAffiliation = mutation({
  args: {
    name: v.string(),
    acronym: v.optional(v.string()),
    type: v.string(),
    description: v.optional(v.string()),
    role: v.optional(v.string()),
    status: v.string(),
    join_date: v.optional(v.string()),
    end_date: v.optional(v.string()),
    activities: v.optional(v.array(v.string())),
    achievements: v.optional(v.array(v.string())),
    website_url: v.optional(v.string()),
    is_featured: v.boolean(),
    order_index: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("affiliations", args);
  },
});

// Mutation to bulk add affiliations
export const bulkAddAffiliations = mutation({
  args: {
    affiliations: v.array(v.object({
      name: v.string(),
      acronym: v.optional(v.string()),
      type: v.string(),
      description: v.optional(v.string()),
      role: v.optional(v.string()),
      status: v.string(),
      join_date: v.optional(v.string()),
      end_date: v.optional(v.string()),
      activities: v.optional(v.array(v.string())),
      achievements: v.optional(v.array(v.string())),
      website_url: v.optional(v.string()),
      is_featured: v.boolean(),
      order_index: v.number(),
    }))
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const affiliation of args.affiliations) {
      const result = await ctx.db.insert("affiliations", affiliation);
      results.push(result);
    }
    return results;
  },
});