import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all goals
export const getAllGoals = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("goals").collect();
  },
});

// Get completed goals
export const getCompletedGoals = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("goals")
      .withIndex("by_completed", (q) => q.eq("is_completed", true))
      .collect();
  },
});

// Get active (not completed) goals
export const getActiveGoals = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("goals")
      .withIndex("by_completed", (q) => q.eq("is_completed", false))
      .collect();
  },
});

// Add a single goal
export const addGoal = mutation({
  args: {
    goal_name: v.string(),
    goal_desc: v.string(),
    goal_reason: v.string(),
    progress: v.number(),
    is_completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("goals", {
      goal_name: args.goal_name,
      goal_desc: args.goal_desc,
      goal_reason: args.goal_reason,
      progress: args.progress,
      is_completed: args.is_completed,
    });
    return id;
  },
});

// Update goal
export const updateGoal = mutation({
  args: {
    id: v.id("goals"),
    goal_name: v.optional(v.string()),
    goal_desc: v.optional(v.string()),
    goal_reason: v.optional(v.string()),
    progress: v.optional(v.number()),
    is_completed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Bulk add multiple goals
export const bulkAddGoals = mutation({
  args: {
    goals: v.array(
      v.object({
        goal_name: v.string(),
        goal_desc: v.string(),
        goal_reason: v.string(),
        progress: v.number(),
        is_completed: v.boolean(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const ids = [] as string[];
    for (const goal of args.goals) {
      const id = await ctx.db.insert("goals", goal);
      ids.push(id);
    }
    return ids;
  },
});
