import { v } from "convex/values";

export const recognitionsTable = {
    title: v.string(),
    award: v.string(),
    organization: v.string(),
    date: v.string(),
    level: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
}