import { defineTable, defineSchema } from "convex/server";

import { projectsTable } from "./tables/projectsTable";
import { skillsTable } from "./tables/skillsTable";
import { affiliationsTable } from "./tables/affiliationsTable";
import { experienceTable } from "./tables/experienceTable";
import { recognitionsTable } from "./tables/recognitionsTable";

export default defineSchema({
    projects: defineTable(projectsTable)
    .index("byProjectField", ["projectField"]),

    skills: defineTable(skillsTable),

    affiliations: defineTable(affiliationsTable),

    experience: defineTable(experienceTable)
    .index("byStartDate", ["experienceStartDate"]),

    recognitions: defineTable(recognitionsTable)
    .index("byLevel", ["level"]),
});
