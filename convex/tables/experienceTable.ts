import { v } from 'convex/values';

export const experienceTable = {
    experienceRole: v.string(),
    experienceCompany: v.string(),
    experienceDesc: v.string(),
    experienceTasks: v.array(v.string()),
    experienceStartDate: v.string(),
    experienceEndDate: v.string(),
    experienceLocation: v.string(),
    experienceTechStack: v.array(v.string())
}
