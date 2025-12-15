import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    proj_name: v.string(),
    proj_desc: v.optional(v.string()),
    proj_repo_link: v.string(),
    proj_deployed_link: v.optional(v.string()),
    frontend_stack: v.array(v.object({
      language: v.string(),
      percentage: v.number()
    })),
    backend_stack: v.array(v.object({
      language: v.string(),
      percentage: v.number()
    })),
    database_stack: v.array(v.object({
      language: v.string(),
      percentage: v.number()
    })),
    collaborators: v.array(v.object({
      name: v.string(),
      github_link: v.string()
    })),
    isFeatured: v.boolean(),
    isDeployed: v.boolean(),
    github_id: v.number(), // GitHub repository ID for uniqueness
    stars: v.optional(v.number()),
    forks: v.optional(v.number()),
    created_at: v.string(),
    updated_at: v.string(),
    topics: v.optional(v.array(v.string())), // GitHub topics/tags
    default_branch: v.optional(v.string()),
  }).index("by_github_id", ["github_id"])
    .index("by_featured", ["isFeatured"])
    .index("by_deployed", ["isDeployed"]),

  experiences: defineTable({
    position: v.string(),
    company: v.string(),
    location: v.optional(v.string()),
    duration: v.string(),
    start_date: v.string(),
    end_date: v.optional(v.string()),
    description: v.array(v.string()), // Array of responsibility/achievement strings
    employment_type: v.string(), // Full-time, Part-time, Freelance, Internship, etc.
    skills_used: v.optional(v.array(v.string())),
    is_current: v.boolean(),
    order_index: v.number(), // For ordering experiences
  }).index("by_order", ["order_index"])
    .index("by_current", ["is_current"]),
});