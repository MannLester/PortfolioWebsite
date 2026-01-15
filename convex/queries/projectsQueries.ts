import { query } from "../_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    // This fetches every row from the 'projects' table
    return await ctx.db.query("projects").collect();
  },
});

export const getProjectFields = query({
  args: {},
  handler: async (ctx) => {
    // Get all projects and extract unique projectField values
    const projects = await ctx.db.query("projects").collect();
    const uniqueFields = [...new Set(projects.map(project => project.projectField))];
    return uniqueFields;
  },
});