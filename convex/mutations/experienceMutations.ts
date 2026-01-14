import { v } from 'convex/values';
import { mutation } from '../_generated/server';

export const addExperiences = mutation({
    args: {
        experienceRole: v.string(),
        experienceCompany: v.string(),
        experienceDesc: v.string(),
        experienceTasks: v.array(v.string()),
        experienceStartDate: v.string(),
        experienceEndDate: v.string(),
        experienceLocation: v.string(),
        experienceTechStack: v.array(v.string())
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("experience", {
            experienceRole: args.experienceRole,
            experienceCompany: args.experienceCompany,
            experienceDesc: args.experienceDesc,
            experienceTasks: args.experienceTasks,
            experienceStartDate: args.experienceStartDate,
            experienceEndDate: args.experienceEndDate,
            experienceLocation: args.experienceLocation,
            experienceTechStack: args.experienceTechStack
    });
    return id;
  }
})

export const updateExperience = mutation({
  args: {
    id: v.id("experience"),
    experienceRole: v.string(),
    experienceCompany: v.string(),
    experienceDesc: v.string(),
    experienceTasks: v.array(v.string()),
    experienceStartDate: v.string(),
    experienceEndDate: v.string(),
    experienceLocation: v.string(),
    experienceTechStack: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
    return id;
  },
});

export const deleteExperience = mutation({
  args: { id: v.id("experience") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});