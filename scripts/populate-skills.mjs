import { ConvexHttpClient } from "convex/browser";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  console.error("Missing NEXT_PUBLIC_CONVEX_URL. Set it before running this script.");
  process.exit(1);
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

function toLetter(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "E";
}

const skillsData = [
  {
    category: "technical",
    skill_name: "Python",
    skill_desc: "General-purpose language for scripting, backend tasks, and data workflows.",
    rating_number: 60,
    rating_letter: toLetter(60),
  },
  {
    category: "soft",
    skill_name: "Communication",
    skill_desc: "Clear, structured communication across teams and stakeholders.",
    rating_number: 90,
    rating_letter: toLetter(90),
  },
];

async function populateSkills() {
  try {
    console.log("Adding skills...", skillsData.map(s => `${s.category}:${s.skill_name}`));
    const result = await convex.mutation("skills:bulkAddSkills", { skills: skillsData });
    console.log("Inserted skill IDs:", result);
    console.log(`Added ${skillsData.length} skills to the database.`);
  } catch (err) {
    console.error("Failed to populate skills:", err);
    process.exit(1);
  }
}

// Execute when run directly
populateSkills().then(() => {
  console.log("Skills population completed successfully!");
  process.exit(0);
});
