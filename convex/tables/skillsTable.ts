import { v } from "convex/values";

export const skillsTable = {
    skillIcon: v.string(),
    skillTitle: v.string(),
    skillSubtitle: v.array(v.string()),
    skillMore: v.array(v.string()),
}