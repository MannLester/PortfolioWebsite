const { ConvexHttpClient } = require("convex/browser");
const { api } = require("../convex/_generated/api");

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function populateSeminars() {
  try {
    console.log("Populating seminars...");
    const result = await convex.mutation(api.seminars.insertInitialSeminars, {});
    console.log("✅ Successfully inserted seminars:", result);
  } catch (error) {
    console.error("❌ Error inserting seminars:", error);
  }
}

populateSeminars();