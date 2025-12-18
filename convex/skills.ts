import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all skills (technical + soft)
export const getAllSkills = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("skills").collect();
  },
});

// Get skills filtered by category ("technical" | "soft")
export const getSkillsByCategory = query({
  args: {
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("skills")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

// Add a single skill
export const addSkill = mutation({
  args: {
    category: v.string(),
    skill_name: v.string(),
    skill_desc: v.string(),
    rating_number: v.number(),
    rating_letter: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("skills", {
      category: args.category,
      skill_name: args.skill_name,
      skill_desc: args.skill_desc,
      rating_number: args.rating_number,
      rating_letter: args.rating_letter,
    });
    return id;
  },
});

// Bulk add multiple skills
export const bulkAddSkills = mutation({
  args: {
    skills: v.array(
      v.object({
        category: v.string(),
        skill_name: v.string(),
        skill_desc: v.string(),
        rating_number: v.number(),
        rating_letter: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const ids = [] as string[];
    for (const s of args.skills) {
      const id = await ctx.db.insert("skills", s);
      ids.push(id);
    }
    return ids;
  },
});
