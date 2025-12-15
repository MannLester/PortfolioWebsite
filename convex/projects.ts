import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all projects
export const getAllProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

// Query to get featured projects only
export const getFeaturedProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .collect();
  },
});

// Query to get deployed projects only
export const getDeployedProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_deployed", (q) => q.eq("isDeployed", true))
      .collect();
  },
});

// Query to get a single project by ID
export const getProject = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation to create a new project (insert only, no updates)
export const insertNewProject = mutation({
  args: {
    github_id: v.number(),
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
    stars: v.optional(v.number()),
    forks: v.optional(v.number()),
    created_at: v.string(),
    updated_at: v.string(),
    topics: v.optional(v.array(v.string())),
    default_branch: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if project already exists (by GitHub ID or project name)
    const existingProject = await ctx.db
      .query("projects")
      .withIndex("by_github_id", (q) => q.eq("github_id", args.github_id))
      .first();

    if (existingProject) {
      // Project already exists, skip insertion
      return {
        success: false,
        message: `Project "${args.proj_name}" already exists in database`,
        projectId: existingProject._id,
        action: "skipped"
      };
    }

    // Create new project only if it doesn't exist
    const newProjectId = await ctx.db.insert("projects", args);
    return {
      success: true,
      message: `Successfully added new project "${args.proj_name}"`,
      projectId: newProjectId,
      action: "inserted"
    };
  },
});

// Check if a project exists by GitHub ID
export const projectExists = query({
  args: { github_id: v.number() },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query("projects")
      .withIndex("by_github_id", (q) => q.eq("github_id", args.github_id))
      .first();
    return !!project;
  },
});

// Get projects that need manual review (recently added)
export const getRecentlyAddedProjects = query({
  args: { daysAgo: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const days = args.daysAgo || 7;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const projects = await ctx.db.query("projects").collect();
    
    // Filter projects added recently (you can adjust this logic)
    return projects.filter(project => {
      const creationTime = new Date(project._creationTime);
      return creationTime >= cutoffDate;
    });
  },
});

// Mutation to toggle featured status
export const toggleFeatured = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) throw new Error("Project not found");
    
    await ctx.db.patch(args.id, {
      isFeatured: !project.isFeatured,
    });
  },
});

// Mutation to update deployment status
export const updateDeploymentStatus = mutation({
  args: { 
    id: v.id("projects"),
    isDeployed: v.boolean(),
    deployedLink: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      isDeployed: args.isDeployed,
      proj_deployed_link: args.deployedLink,
    });
  },
});

// Mutation to manually update project details (for admin editing)
export const updateProjectDetails = mutation({
  args: {
    id: v.id("projects"),
    proj_name: v.optional(v.string()),
    proj_desc: v.optional(v.string()),
    proj_deployed_link: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
    isDeployed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Remove undefined values
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );
    
    await ctx.db.patch(id, cleanUpdates);
    return { success: true, message: "Project updated successfully" };
  },
});

// Mutation to manually add a custom project (not from GitHub)
export const addCustomProject = mutation({
  args: {
    proj_name: v.string(),
    proj_desc: v.optional(v.string()),
    proj_repo_link: v.optional(v.string()),
    proj_deployed_link: v.optional(v.string()),
    frontend_stack: v.optional(v.array(v.object({
      language: v.string(),
      percentage: v.number()
    }))),
    backend_stack: v.optional(v.array(v.object({
      language: v.string(),
      percentage: v.number()
    }))),
    database_stack: v.optional(v.array(v.object({
      language: v.string(),
      percentage: v.number()
    }))),
    isFeatured: v.optional(v.boolean()),
    isDeployed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Generate a unique GitHub ID for custom projects (negative numbers)
    const existingCustomProjects = await ctx.db.query("projects").collect();
    const customProjectIds = existingCustomProjects
      .filter(p => p.github_id < 0)
      .map(p => p.github_id);
    const nextCustomId = customProjectIds.length > 0 ? Math.min(...customProjectIds) - 1 : -1;

    const customProject = {
      github_id: nextCustomId,
      proj_name: args.proj_name,
      proj_desc: args.proj_desc || '',
      proj_repo_link: args.proj_repo_link || '',
      proj_deployed_link: args.proj_deployed_link || '',
      frontend_stack: args.frontend_stack || [],
      backend_stack: args.backend_stack || [],
      database_stack: args.database_stack || [],
      collaborators: [],
      isFeatured: args.isFeatured || false,
      isDeployed: args.isDeployed || false,
      stars: 0,
      forks: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      topics: [],
      default_branch: 'main',
    };

    const projectId = await ctx.db.insert("projects", customProject);
    return { success: true, message: "Custom project added successfully", projectId };
  },
});

// Mutation to delete a project
export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});