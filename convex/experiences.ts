import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all experiences ordered by order_index
export const getAllExperiences = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("experiences")
      .withIndex("by_order")
      .collect();
  },
});

// Query to get current experiences only
export const getCurrentExperiences = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("experiences")
      .withIndex("by_current", (q) => q.eq("is_current", true))
      .collect();
  },
});

// Query to get a single experience by ID
export const getExperience = query({
  args: { id: v.id("experiences") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation to add new experience
export const addExperience = mutation({
  args: {
    position: v.string(),
    company: v.string(),
    location: v.optional(v.string()),
    duration: v.string(),
    start_date: v.string(),
    end_date: v.optional(v.string()),
    description: v.array(v.string()),
    employment_type: v.string(),
    skills_used: v.optional(v.array(v.string())),
    is_current: v.boolean(),
    order_index: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("experiences", args);
  },
});

// Mutation to update experience
export const updateExperience = mutation({
  args: {
    id: v.id("experiences"),
    position: v.optional(v.string()),
    company: v.optional(v.string()),
    location: v.optional(v.string()),
    duration: v.optional(v.string()),
    start_date: v.optional(v.string()),
    end_date: v.optional(v.string()),
    description: v.optional(v.array(v.string())),
    employment_type: v.optional(v.string()),
    skills_used: v.optional(v.array(v.string())),
    is_current: v.optional(v.boolean()),
    order_index: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

// Mutation to delete experience
export const deleteExperience = mutation({
  args: { id: v.id("experiences") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Mutation to bulk insert initial experience data
export const insertInitialExperiences = mutation({
  args: {},
  handler: async (ctx) => {
    const experiences = [
      {
        position: "Full Stack Developer, Team Leader, Data Engineer, Quality Assurance",
        company: "Center for AI and Science Technologies (CAIST)",
        location: "",
        duration: "May – July 2024",
        start_date: "2024-05-01",
        end_date: "2024-07-31",
        description: [
          "Led a development team and coordinated project execution",
          "Built full-stack features for an AI-related project",
          "Engineered mock datasets for AI model training"
        ],
        employment_type: "Full-time",
        skills_used: ["Team Leadership", "Full Stack Development", "Data Engineering", "Quality Assurance", "AI/ML"],
        is_current: false,
        order_index: 1,
      },
      {
        position: "Full Stack Developer",
        company: "StayEase",
        location: "",
        duration: "May – July 2024",
        start_date: "2024-05-01",
        end_date: "2024-07-31",
        description: [
          "Developed and maintained the StayEase web platform",
          "Focused on dorm owner–side features and workflows"
        ],
        employment_type: "Full-time",
        skills_used: ["Full Stack Development", "Web Development", "Platform Development"],
        is_current: false,
        order_index: 2,
      },
      {
        position: "Full Stack Developer (Freelance)",
        company: "SmartPlate",
        location: "",
        duration: "May 2025",
        start_date: "2025-05-01",
        end_date: "2025-05-31",
        description: [
          "Designed and developed the SmartPlate application as a freelance project"
        ],
        employment_type: "Freelance",
        skills_used: ["Full Stack Development", "Application Design", "Freelance Work"],
        is_current: false,
        order_index: 3,
      },
      {
        position: "Beta Tester Intern",
        company: "Bowled.io / Internshala",
        location: "",
        duration: "August 11 – September 11",
        start_date: "2024-08-11",
        end_date: "2024-09-11",
        description: [
          "Performed comprehensive testing of web applications",
          "Identified, documented, and reported bugs and usability issues",
          "Provided actionable feedback to improve product quality"
        ],
        employment_type: "Internship",
        skills_used: ["Quality Assurance", "Testing", "Bug Reporting", "Documentation"],
        is_current: false,
        order_index: 4,
      },
      {
        position: "Virtual Apprentice",
        company: "Limitless Lab / KadaKareer",
        location: "",
        duration: "May 20 – July 1",
        start_date: "2024-05-20",
        end_date: "2024-07-01",
        description: [
          "Participated in a structured virtual apprenticeship program",
          "Gained hands-on experience in web development",
          "Collaborated with team members on development tasks"
        ],
        employment_type: "Apprenticeship",
        skills_used: ["Web Development", "Team Collaboration", "Learning"],
        is_current: false,
        order_index: 5,
      },
      {
        position: "Social Media Manager",
        company: "QuickSpace & JackOfAllTrades Academics",
        location: "",
        duration: "August 18 – September 18",
        start_date: "2024-08-18",
        end_date: "2024-09-18",
        description: [
          "Managed social media accounts across multiple platforms",
          "Created, scheduled, and optimized content",
          "Analyzed engagement metrics to refine content strategy"
        ],
        employment_type: "Part-time",
        skills_used: ["Social Media Management", "Content Creation", "Analytics", "Strategy"],
        is_current: false,
        order_index: 6,
      },
      {
        position: "Web Developer",
        company: "The Green Light Project / LinkedIn",
        location: "",
        duration: "August 21 – November 30",
        start_date: "2024-08-21",
        end_date: "2024-11-30",
        description: [
          "Developed and maintained responsive web applications",
          "Collaborated with team members on requirements and delivery"
        ],
        employment_type: "Contract",
        skills_used: ["Web Development", "Responsive Design", "Team Collaboration"],
        is_current: false,
        order_index: 7,
      },
    ];

    // Insert all experiences
    for (const experience of experiences) {
      await ctx.db.insert("experiences", experience);
    }

    return { success: true, inserted: experiences.length };
  },
});