import { ConvexHttpClient } from "convex/browser";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  console.error("Missing NEXT_PUBLIC_CONVEX_URL. Set it before running this script.");
  process.exit(1);
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

const goalsData = [
  {
    goal_name: "Master Full-Stack Development",
    goal_desc: "Build expertise across frontend and backend technologies, from React/Next.js to Node.js, databases, and cloud deployment.",
    goal_reason: "To become a versatile developer capable of building complete, production-ready applications independently.",
    progress: 65,
    is_completed: false,
  },
  {
    goal_name: "Contribute to Open Source",
    goal_desc: "Make meaningful contributions to open-source projects, helping the developer community while improving my skills.",
    goal_reason: "To give back to the community, learn from experienced developers, and build a strong public portfolio.",
    progress: 30,
    is_completed: false,
  },
  {
    goal_name: "Launch Personal SaaS Product",
    goal_desc: "Design, develop, and launch a software-as-a-service product that solves a real problem for users.",
    goal_reason: "To apply my skills in a real-world context, understand business needs, and create value for others.",
    progress: 20,
    is_completed: false,
  },
  {
    goal_name: "Complete Portfolio Website",
    goal_desc: "Build a professional, interactive portfolio showcasing my projects, skills, and experience.",
    goal_reason: "To present my work effectively to potential employers and clients while demonstrating my technical abilities.",
    progress: 85,
    is_completed: false,
  },
  {
    goal_name: "Learn Python for Data Science",
    goal_desc: "Gain proficiency in Python libraries like pandas, NumPy, and matplotlib for data analysis and visualization.",
    goal_reason: "To expand my skill set beyond web development and open opportunities in data-driven roles.",
    progress: 45,
    is_completed: false,
  },
];

async function populateGoals() {
  try {
    console.log("Adding goals...", goalsData.map(g => `${g.goal_name} (${g.progress}%)`));
    const result = await convex.mutation("goals:bulkAddGoals", { goals: goalsData });
    console.log("Inserted goal IDs:", result);
    console.log(`Added ${goalsData.length} goals to the database.`);
  } catch (err) {
    console.error("Failed to populate goals:", err);
    process.exit(1);
  }
}

// Execute when run directly
populateGoals().then(() => {
  console.log("Goals population completed successfully!");
  process.exit(0);
});
