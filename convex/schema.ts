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

  recognitions: defineTable({
    title: v.string(),
    organization: v.optional(v.string()),
    category: v.string(), // Certification, Award, Competition, Leadership, Examination
    description: v.optional(v.string()),
    date_received: v.string(),
    year: v.number(),
    rank_position: v.optional(v.string()), // "1st Place", "Top 10", "Finalist", etc.
    achievement_type: v.string(), // "Winner", "Participant", "Completer", "Passer", "Head", etc.
    skills_related: v.optional(v.array(v.string())),
    certificate_url: v.optional(v.string()),
    is_featured: v.boolean(),
    order_index: v.number(),
  }).index("by_category", ["category"])
    .index("by_year", ["year"])
    .index("by_featured", ["is_featured"])
    .index("by_order", ["order_index"]),

  seminars: defineTable({
    title: v.string(),
    type: v.string(), // Conference, Workshop, Training, Webinar, etc.
    organization: v.optional(v.string()),
    description: v.optional(v.string()),
    date_attended: v.string(),
    year: v.number(),
    duration: v.optional(v.string()), // "2 days", "3 hours", etc.
    location: v.optional(v.string()),
    topics: v.optional(v.array(v.string())),
    skills_gained: v.optional(v.array(v.string())),
    certificate_url: v.optional(v.string()),
    is_featured: v.boolean(),
    order_index: v.number(),
  }).index("by_type", ["type"])
    .index("by_year", ["year"])
    .index("by_featured", ["is_featured"])
    .index("by_order", ["order_index"]),

  affiliations: defineTable({
    name: v.string(),
    acronym: v.optional(v.string()),
    type: v.string(), // Organization, Club, Society, Advocacy Group, etc.
    description: v.optional(v.string()),
    role: v.optional(v.string()), // Member, Officer, Advocate, etc.
    status: v.string(), // Active, Alumni, Former, etc.
    join_date: v.optional(v.string()),
    end_date: v.optional(v.string()),
    activities: v.optional(v.array(v.string())),
    achievements: v.optional(v.array(v.string())),
    website_url: v.optional(v.string()),
    is_featured: v.boolean(),
    order_index: v.number(),
  }).index("by_type", ["type"])
    .index("by_status", ["status"])
    .index("by_featured", ["is_featured"])
    .index("by_order", ["order_index"]),

  // Skills table: for both technical and soft skills
  skills: defineTable({
    category: v.string(), // "technical" | "soft"
    skill_name: v.string(),
    skill_desc: v.string(),
    rating_number: v.number(), // 0-100
    rating_letter: v.string(), // e.g., "A", "B"
  })
    .index("by_category", ["category"]) 
    .index("by_rating", ["rating_number"]),

  about: defineTable({
    title: v.string(),
    description: v.string(),
    highlights: v.array(v.string()), // Key highlights/achievements
    personality_traits: v.array(v.string()),
    career_focus: v.string(),
    is_active: v.boolean(), // Only one should be active at a time
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_active", ["is_active"]),

  contacts: defineTable({
    contact_type: v.string(), // "link", "email", "number"
    contact_name: v.string(), // "GitHub", "Contact Number", "Facebook", etc.
    contact_link: v.string(), // actual URL/email/phone number
    is_active: v.boolean(),
  }).index("by_type", ["contact_type"])
    .index("by_active", ["is_active"]),

  goals: defineTable({
    goal_name: v.string(),
    goal_desc: v.string(),
    goal_reason: v.string(),
    progress: v.number(), // 0-100
    is_completed: v.boolean(),
  }).index("by_completed", ["is_completed"])
    .index("by_progress", ["progress"]),
});