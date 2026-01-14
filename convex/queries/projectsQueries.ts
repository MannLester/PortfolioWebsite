import { query } from "../_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    // This fetches every row from the 'projects' table
    return await ctx.db.query("projects").collect();
  },
});