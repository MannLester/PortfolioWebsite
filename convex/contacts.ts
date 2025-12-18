import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all active contacts
export const getActiveContacts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contacts")
      .withIndex("by_active", (q) => q.eq("is_active", true))
      .collect();
  },
});

// Query to get all contacts
export const getAllContacts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contacts").collect();
  },
});

// Query to get contacts by type
export const getContactsByType = query({
  args: { contact_type: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contacts")
      .withIndex("by_type", (q) => q.eq("contact_type", args.contact_type))
      .collect();
  },
});

// Mutation to add new contact
export const addContact = mutation({
  args: {
    contact_type: v.string(),
    contact_name: v.string(),
    contact_link: v.string(),
    is_active: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contacts", args);
  },
});

// Mutation to update contact
export const updateContact = mutation({
  args: {
    id: v.id("contacts"),
    contact_type: v.optional(v.string()),
    contact_name: v.optional(v.string()),
    contact_link: v.optional(v.string()),
    is_active: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Remove undefined values
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );
    
    return await ctx.db.patch(id, filteredUpdates);
  },
});

// Mutation to delete contact
export const deleteContact = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Mutation to bulk add contacts
export const bulkAddContacts = mutation({
  args: {
    contacts: v.array(v.object({
      contact_type: v.string(),
      contact_name: v.string(),
      contact_link: v.string(),
      is_active: v.boolean(),
    }))
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const contact of args.contacts) {
      const result = await ctx.db.insert("contacts", contact);
      results.push(result);
    }
    return results;
  },
});

// Query to get active contact information
export const getActiveContactInfo = query({
  args: {},
  handler: async (ctx) => {
    const contact = await ctx.db
      .query("contacts")
      .withIndex("by_type", (q) => q.eq("type", "info"))
      .filter((q) => q.eq(q.field("is_active"), true))
      .first();
    return contact;
  },
});

// Query to get all contact messages
export const getContactMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contacts")
      .withIndex("by_type", (q) => q.eq("type", "message"))
      .order("desc")
      .collect();
  },
});

// Query to get unread contact messages
export const getUnreadMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contacts")
      .withIndex("by_type", (q) => q.eq("type", "message"))
      .filter((q) => q.eq(q.field("is_read"), false))
      .collect();
  },
});

// Mutation to add contact information
export const addContactInfo = mutation({
  args: {
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    website: v.optional(v.string()),
    is_active: v.boolean(),
    created_at: v.string(),
    updated_at: v.string(),
  },
  handler: async (ctx, args) => {
    // If this is being set as active, deactivate all others
    if (args.is_active) {
      const existingActive = await ctx.db
        .query("contacts")
        .withIndex("by_type", (q) => q.eq("type", "info"))
        .filter((q) => q.eq(q.field("is_active"), true))
        .collect();
      
      for (const entry of existingActive) {
        await ctx.db.patch(entry._id, { is_active: false });
      }
    }
    
    return await ctx.db.insert("contacts", {
      type: "info",
      ...args,
    });
  },
});

// Mutation to submit contact form message
export const submitContactMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    
    return await ctx.db.insert("contacts", {
      type: "message",
      name: args.name,
      email: args.email,
      subject: args.subject,
      message: args.message,
      submitted_at: now,
      is_read: false,
      created_at: now,
      updated_at: now,
    });
  },
});

// Mutation to mark message as read
export const markMessageAsRead = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { 
      is_read: true,
      updated_at: new Date().toISOString(),
    });
  },
});

// Mutation to delete contact message
export const deleteContactMessage = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Mutation to bulk add contact info
export const bulkAddContactInfo = mutation({
  args: {
    entries: v.array(v.object({
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      linkedin: v.optional(v.string()),
      github: v.optional(v.string()),
      website: v.optional(v.string()),
      is_active: v.boolean(),
      created_at: v.string(),
      updated_at: v.string(),
    }))
  },
  handler: async (ctx, args) => {
    // Deactivate all existing entries first
    const existingActive = await ctx.db
      .query("contacts")
      .withIndex("by_type", (q) => q.eq("type", "info"))
      .filter((q) => q.eq(q.field("is_active"), true))
      .collect();
    
    for (const entry of existingActive) {
      await ctx.db.patch(entry._id, { is_active: false });
    }
    
    const results = [];
    for (const contactInfo of args.entries) {
      const result = await ctx.db.insert("contacts", {
        type: "info",
        ...contactInfo,
      });
      results.push(result);
    }
    return results;
  },
});