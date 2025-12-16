import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all seminars ordered by order_index
export const getAllSeminars = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("seminars")
      .withIndex("by_order")
      .collect();
  },
});

// Query to get featured seminars only
export const getFeaturedSeminars = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("seminars")
      .withIndex("by_featured", (q) => q.eq("is_featured", true))
      .collect();
  },
});

// Query to get seminars by type
export const getSeminarsByType = query({
  args: { type: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("seminars")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .collect();
  },
});

// Query to get a single seminar by ID
export const getSeminar = query({
  args: { id: v.id("seminars") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation to add new seminar
export const addSeminar = mutation({
  args: {
    title: v.string(),
    type: v.string(),
    organization: v.optional(v.string()),
    description: v.optional(v.string()),
    date_attended: v.string(),
    year: v.number(),
    duration: v.optional(v.string()),
    location: v.optional(v.string()),
    topics: v.optional(v.array(v.string())),
    skills_gained: v.optional(v.array(v.string())),
    certificate_url: v.optional(v.string()),
    is_featured: v.boolean(),
    order_index: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("seminars", args);
  },
});

// Mutation to update an existing seminar
export const updateSeminar = mutation({
  args: {
    id: v.id("seminars"),
    title: v.optional(v.string()),
    type: v.optional(v.string()),
    organization: v.optional(v.string()),
    description: v.optional(v.string()),
    date_attended: v.optional(v.string()),
    year: v.optional(v.number()),
    duration: v.optional(v.string()),
    location: v.optional(v.string()),
    topics: v.optional(v.array(v.string())),
    skills_gained: v.optional(v.array(v.string())),
    certificate_url: v.optional(v.string()),
    is_featured: v.optional(v.boolean()),
    order_index: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Remove undefined values
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );
    
    return await ctx.db.patch(id, filteredUpdates);
  },
});

// Mutation to delete a seminar
export const deleteSeminar = mutation({
  args: { id: v.id("seminars") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Mutation to toggle featured status
export const toggleSeminarFeatured = mutation({
  args: { id: v.id("seminars") },
  handler: async (ctx, args) => {
    const seminar = await ctx.db.get(args.id);
    if (!seminar) {
      throw new Error("Seminar not found");
    }
    
    return await ctx.db.patch(args.id, { 
      is_featured: !seminar.is_featured 
    });
  },
});

// Mutation to bulk add seminars
export const bulkAddSeminars = mutation({
  args: {
    seminars: v.array(v.object({
      title: v.string(),
      type: v.string(),
      organization: v.optional(v.string()),
      description: v.optional(v.string()),
      date_attended: v.string(),
      year: v.number(),
      duration: v.optional(v.string()),
      location: v.optional(v.string()),
      topics: v.optional(v.array(v.string())),
      skills_gained: v.optional(v.array(v.string())),
      certificate_url: v.optional(v.string()),
      is_featured: v.boolean(),
      order_index: v.number(),
    }))
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const seminar of args.seminars) {
      const result = await ctx.db.insert("seminars", seminar);
      results.push(result);
    }
    return results;
  },
});

// Mutation to insert initial seminar data
export const insertInitialSeminars = mutation({
  args: {},
  handler: async (ctx) => {
    const seminars = [
      {
        title: "Hackin' Ka Na Lang 2023 – Cybersecurity Conference",
        type: "Conference",
        organization: "Hackin' Ka Na Lang",
        description: "A comprehensive cybersecurity conference focused on ethical hacking, penetration testing, and security best practices. The conference covered various aspects of cybersecurity including vulnerability assessment, threat analysis, and defense strategies.",
        date_attended: "2023-10-15",
        year: 2023,
        duration: "2 days",
        location: "Philippines",
        topics: [
          "Ethical Hacking",
          "Penetration Testing",
          "Cybersecurity",
          "Vulnerability Assessment",
          "Network Security",
          "Web Application Security"
        ],
        skills_gained: [
          "Security Assessment",
          "Threat Modeling",
          "Penetration Testing Tools",
          "Security Best Practices",
          "Risk Analysis"
        ],
        certificate_url: undefined,
        is_featured: true,
        order_index: 1,
      },
      {
        title: "KadaKareer Virtual Apprenticeship Program",
        type: "Training Program",
        organization: "KadaKareer",
        description: "An intensive virtual apprenticeship program designed to bridge the gap between academic learning and industry requirements. The program focused on practical skills development and real-world project experience.",
        date_attended: "2023-06-01",
        year: 2023,
        duration: "3 months",
        location: "Virtual",
        topics: [
          "Professional Development",
          "Industry Best Practices",
          "Project Management",
          "Team Collaboration",
          "Career Development",
          "Technical Skills"
        ],
        skills_gained: [
          "Project Management",
          "Professional Communication",
          "Industry Standards",
          "Team Collaboration",
          "Problem Solving"
        ],
        certificate_url: undefined,
        is_featured: true,
        order_index: 2,
      },
      {
        title: "BITCON 2024 Batangas – Information Technology Conference",
        type: "Conference",
        organization: "BITCON Batangas",
        description: "A premier information technology conference in Batangas showcasing the latest trends, innovations, and developments in the IT industry. The conference brought together technology professionals, students, and industry leaders.",
        date_attended: "2024-03-20",
        year: 2024,
        duration: "1 day",
        location: "Batangas, Philippines",
        topics: [
          "Information Technology",
          "Software Development",
          "Digital Transformation",
          "Emerging Technologies",
          "IT Innovation",
          "Technology Trends"
        ],
        skills_gained: [
          "Technology Awareness",
          "Industry Insights",
          "Networking",
          "Innovation Mindset",
          "Future Tech Trends"
        ],
        certificate_url: undefined,
        is_featured: true,
        order_index: 3,
      },
    ];

    const results = [];
    for (const seminar of seminars) {
      const result = await ctx.db.insert("seminars", seminar);
      results.push(result);
    }
    return results;
  },
});