const { ConvexHttpClient } = require("convex/browser");
const { api } = require("../convex/_generated/api");

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function populateExperiences() {
  try {
    console.log("Populating experiences...");
    const result = await convex.mutation(api.experiences.insertInitialExperiences, {});
    console.log("✅ Successfully inserted experiences:", result);
  } catch (error) {
    console.error("❌ Error inserting experiences:", error);
  }
}

populateExperiences();