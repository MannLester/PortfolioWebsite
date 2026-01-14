import { v } from "convex/values";

export const projectsTable = {
    projectTitle: v.string(),
    projectDesc: v.string(),
    projectField: v.string(),
    projectTech: v.array(v.string()),
    isDeployed: v.boolean(),
    projectLiveLink: v.optional(v.string()),
    projectGithubLink: v.string(),
    projectImageUrl: v.optional(v.string()),
}
