import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const addSkills = mutation({
    args: {
        skillIcon: v.string(),
        skillTitle: v.string(),
        skillSubtitle: v.array(v.string()),
        skillMore: v.array(v.string()), 
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("skills", {
            skillIcon: args.skillIcon,
            skillTitle: args.skillTitle,
            skillSubtitle: args.skillSubtitle,
            skillMore: args.skillMore,
        });
        return id;
    }
})

export const updateSkills = mutation({
  args: {
        id: v.id("skills"),
        skillIcon: v.string(),
        skillTitle: v.string(),
        skillSubtitle: v.array(v.string()),
        skillMore: v.array(v.string()), 
    },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
    return id;
  },
});

export const deleteSkills = mutation({
  args: { id: v.id("skills") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});