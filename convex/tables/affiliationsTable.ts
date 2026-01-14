import { v } from 'convex/values';

export const affiliationsTable = {
    affiliationImage: v.string(),
    affiliationTitle: v.string(),
    affiliationLink: v.string(),
    affilitationRole: v.array(v.string())
}