import { v } from "convex/values";
import { mutation } from "../_generated/server";

// Project mutations - updated for optional image and live link
export const addProject = mutation({
    args: {
        projectTitle: v.string(),
        projectDesc: v.string(),
        projectField: v.string(),
        projectTech: v.array(v.string()),
        isDeployed: v.boolean(),
        projectLiveLink: v.string(),
        projectGithubLink: v.string(),
        projectImageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("projects", {
            projectTitle: args.projectTitle,
            projectDesc: args.projectDesc,
            projectField: args.projectField,
            projectTech: args.projectTech,
            isDeployed: args.isDeployed,
            projectLiveLink: args.projectLiveLink.trim() === "" ? undefined : args.projectLiveLink,
            projectGithubLink: args.projectGithubLink,
            projectImageUrl: args.projectImageUrl.trim() === "" ? undefined : args.projectImageUrl,
        });
        return id;
    }
});

export const updateProject = mutation({
    args: {
        id: v.id("projects"),
        projectTitle: v.string(),
        projectDesc: v.string(),
        projectField: v.string(),
        projectTech: v.array(v.string()),
        isDeployed: v.boolean(),
        projectLiveLink: v.string(),
        projectGithubLink: v.string(),
        projectImageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...rest } = args;
        const updateData = {
            ...rest,
            projectLiveLink: rest.projectLiveLink.trim() === "" ? undefined : rest.projectLiveLink,
            projectImageUrl: rest.projectImageUrl.trim() === "" ? undefined : rest.projectImageUrl,
        };
        await ctx.db.patch(id, updateData);
        return id;
    },
});

export const deleteProject = mutation({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return args.id;
    },
});