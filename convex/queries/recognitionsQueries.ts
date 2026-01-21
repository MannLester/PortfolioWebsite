import { query } from "../_generated/server";

export const getGroupedByLevel = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("recognitions").collect();
    
    const sorted = all.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Grouping logic so the frontend doesn't have to filter manually
    return {
      international: sorted.filter(r => r.level === "International"),
      national: sorted.filter(r => r.level === "National"),
      program: sorted.filter(r => r.level === "Program Award"),
    };
  },
});