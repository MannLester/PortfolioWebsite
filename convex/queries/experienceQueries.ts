import { query } from "../_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    // This fetches every row from the 'affiliations' table
    return await ctx.db.query("experience").collect();
  },
});