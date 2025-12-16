import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all recognitions ordered by order_index
export const getAllRecognitions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("recognitions")
      .withIndex("by_order")
      .collect();
  },
});

// Query to get recognitions by category
export const getRecognitionsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("recognitions")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

// Query to get featured recognitions
export const getFeaturedRecognitions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("recognitions")
      .withIndex("by_featured", (q) => q.eq("is_featured", true))
      .collect();
  },
});

// Query to get recognitions by year
export const getRecognitionsByYear = query({
  args: { year: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("recognitions")
      .withIndex("by_year", (q) => q.eq("year", args.year))
      .collect();
  },
});

// Query to get recognition categories with counts
export const getRecognitionCategories = query({
  args: {},
  handler: async (ctx) => {
    const recognitions = await ctx.db.query("recognitions").collect();
    const categories = recognitions.reduce((acc, recognition) => {
      const category = recognition.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categories).map(([name, count]) => ({ name, count }));
  },
});

// Mutation to add new recognition
export const addRecognition = mutation({
  args: {
    title: v.string(),
    organization: v.optional(v.string()),
    category: v.string(),
    description: v.optional(v.string()),
    date_received: v.string(),
    year: v.number(),
    rank_position: v.optional(v.string()),
    achievement_type: v.string(),
    skills_related: v.optional(v.array(v.string())),
    certificate_url: v.optional(v.string()),
    is_featured: v.boolean(),
    order_index: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("recognitions", args);
  },
});

// Mutation to update recognition
export const updateRecognition = mutation({
  args: {
    id: v.id("recognitions"),
    title: v.optional(v.string()),
    organization: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    date_received: v.optional(v.string()),
    year: v.optional(v.number()),
    rank_position: v.optional(v.string()),
    achievement_type: v.optional(v.string()),
    skills_related: v.optional(v.array(v.string())),
    certificate_url: v.optional(v.string()),
    is_featured: v.optional(v.boolean()),
    order_index: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

// Mutation to delete recognition
export const deleteRecognition = mutation({
  args: { id: v.id("recognitions") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Mutation to toggle featured status
export const toggleFeatured = mutation({
  args: { id: v.id("recognitions") },
  handler: async (ctx, args) => {
    const recognition = await ctx.db.get(args.id);
    if (!recognition) throw new Error("Recognition not found");
    
    await ctx.db.patch(args.id, {
      is_featured: !recognition.is_featured,
    });
  },
});

// Mutation to bulk insert initial recognition data
export const insertInitialRecognitions = mutation({
  args: {},
  handler: async (ctx) => {
    const recognitions = [
      {
        title: "AWS Cloud Practitioner Essentials Completer",
        organization: "Amazon Web Services (AWS)",
        category: "Certification",
        description: "Completed comprehensive training on AWS cloud fundamentals and best practices",
        date_received: "2024-12-01",
        year: 2024,
        achievement_type: "Completer",
        skills_related: ["AWS", "Cloud Computing", "Cloud Architecture"],
        is_featured: true,
        order_index: 1,
      },
      {
        title: "Virtual Apprenticeship Completer",
        organization: "KadaKareer",
        category: "Certification",
        description: "Successfully completed virtual apprenticeship program in software development",
        date_received: "2024-07-01",
        year: 2024,
        achievement_type: "Completer",
        skills_related: ["Software Development", "Professional Development"],
        is_featured: true,
        order_index: 2,
      },
      {
        title: "KadaKareer Coaches' Choice Award",
        organization: "KadaKareer",
        category: "Award",
        description: "Recognized by coaches for outstanding performance and dedication",
        date_received: "2024-07-15",
        year: 2024,
        rank_position: "Winner",
        achievement_type: "Award Winner",
        skills_related: ["Leadership", "Professional Excellence"],
        is_featured: true,
        order_index: 3,
      },
      {
        title: "2nd Place – Website Pitching Competition",
        category: "Competition",
        description: "Achieved second place in website pitching competition",
        date_received: "2024-08-01",
        year: 2024,
        rank_position: "2nd Place",
        achievement_type: "Winner",
        skills_related: ["Web Development", "Presentation", "Pitching"],
        is_featured: true,
        order_index: 4,
      },
      {
        title: "Hackathon: World Engineering Day Pitching Competition",
        category: "Competition",
        description: "Participated in international engineering hackathon competition",
        date_received: "2024-03-04",
        year: 2024,
        rank_position: "Participant",
        achievement_type: "Participant",
        skills_related: ["Engineering", "Innovation", "Problem Solving"],
        is_featured: false,
        order_index: 5,
      },
      {
        title: "Top 10 Finalist – CTI SUCCESS Program",
        organization: "CTI",
        category: "Competition",
        description: "Reached top 10 finalist position in CTI SUCCESS Program",
        date_received: "2024-09-01",
        year: 2024,
        rank_position: "Top 10 Finalist",
        achievement_type: "Finalist",
        skills_related: ["Business Development", "Innovation"],
        is_featured: true,
        order_index: 6,
      },
      {
        title: "5th Place – CodeChum National Programming Competition",
        organization: "CodeChum",
        category: "Competition",
        description: "Achieved 5th place in national-level programming competition",
        date_received: "2024-10-01",
        year: 2024,
        rank_position: "5th Place",
        achievement_type: "Winner",
        skills_related: ["Programming", "Algorithms", "Problem Solving"],
        is_featured: true,
        order_index: 7,
      },
      {
        title: "Top 7 – Sustainability Expo 2024 Hackathon x Circular Innovation Challenge",
        organization: "International Organization",
        category: "Competition",
        description: "Achieved top 7 position in international sustainability hackathon",
        date_received: "2024-11-01",
        year: 2024,
        rank_position: "Top 7",
        achievement_type: "Finalist",
        skills_related: ["Sustainability", "Innovation", "Environmental Technology"],
        is_featured: true,
        order_index: 8,
      },
      {
        title: "Career Service Examination (CSE) Sub-Professional Passer",
        organization: "Civil Service Commission",
        category: "Examination",
        description: "Successfully passed the Career Service Examination for Sub-Professional level",
        date_received: "2024-12-01",
        year: 2024,
        rank_position: "Passer",
        achievement_type: "Passer",
        skills_related: ["Government Service", "Professional Competency"],
        is_featured: true,
        order_index: 9,
      },
      {
        title: "TOPCIT Software Competency Exam Taker",
        organization: "TOPCIT",
        category: "Examination",
        description: "Participated in TOPCIT software competency assessment",
        date_received: "2024-11-15",
        year: 2024,
        rank_position: "Participant",
        achievement_type: "Participant",
        skills_related: ["Software Development", "Technical Competency"],
        is_featured: false,
        order_index: 10,
      },
      {
        title: "Head – SCRIPT Organization, Game Development Branch",
        organization: "SCRIPT Organization",
        category: "Leadership",
        description: "Leading the game development branch of SCRIPT Organization",
        date_received: "2025-01-01",
        year: 2025,
        rank_position: "Head",
        achievement_type: "Leadership Role",
        skills_related: ["Leadership", "Game Development", "Team Management"],
        is_featured: true,
        order_index: 11,
      },
      {
        title: "Head Facilitator – UI/UX Redesign Competition",
        category: "Leadership",
        description: "Served as head facilitator for UI/UX redesign competition",
        date_received: "2025-02-01",
        year: 2025,
        rank_position: "Head Facilitator",
        achievement_type: "Leadership Role",
        skills_related: ["UI/UX Design", "Event Management", "Facilitation"],
        is_featured: true,
        order_index: 12,
      },
      {
        title: "Co-Head Facilitator – Robotics Competition",
        category: "Leadership",
        description: "Served as co-head facilitator for robotics competition",
        date_received: "2025-03-01",
        year: 2025,
        rank_position: "Co-Head Facilitator",
        achievement_type: "Leadership Role",
        skills_related: ["Robotics", "Event Management", "Facilitation"],
        is_featured: true,
        order_index: 13,
      },
    ];

    // Insert all recognitions
    for (const recognition of recognitions) {
      await ctx.db.insert("recognitions", recognition);
    }

    return { success: true, inserted: recognitions.length };
  },
});