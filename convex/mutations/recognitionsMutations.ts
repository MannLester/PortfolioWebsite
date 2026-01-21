import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const addRecognition = mutation({
  args: {
    title: v.string(),
    award: v.string(),
    organization: v.string(),
    date: v.string(),
    level: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("recognitions", args);
  },
});

export const updateRecognition = mutation({
  args: {
    id: v.id("recognitions"),
    title: v.optional(v.string()),
    award: v.optional(v.string()),
    organization: v.optional(v.string()),
    date: v.optional(v.string()),
    level: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const removeRecognition = mutation({
  args: { id: v.id("recognitions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});