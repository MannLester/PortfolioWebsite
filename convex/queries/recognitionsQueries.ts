import { query } from "../_generated/server";

export const getGroupedByLevel = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("recognitions").collect();

    // 1. If no data, return empty structures to avoid frontend crashes
    if (!all || all.length === 0) {
      return { international: [], national: [], program: [] };
    }

    // 2. Create a shallow copy [...all] before sorting to avoid mutation errors
    // 3. Add safety checks for the date parsing
    const sorted = [...all].sort((a, b) => {
      // Priority 1: Manual Order
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;

      // Priority 2: Date Fallback (Safety: default to 0 if date is missing)
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      
      return dateB - dateA; // Descending (Newest first)
    });

    return {
      international: sorted.filter(r => r.level === "International"),
      national: sorted.filter(r => r.level === "National"),
      program: sorted.filter(r => r.level === "Program Award"),
    };
  },
});