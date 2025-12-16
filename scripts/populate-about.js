const { ConvexHttpClient } = require("convex/browser");

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

const aboutData = [
  {
    title: "About Me",
    description: "Enthusiastic Junior Full Stack Developer proficient in multiple programming languages and frameworks. Versatile in multiple aspects of development: from planning to deployment. Recognized by national to international competitions and certifications. Eager to apply my technical and soft skills, strong problem-solving ability, and creative vision to build meaningful and innovative web solutions.",
    highlights: [
      "Recognized in national to international competitions",
      "Multiple programming certifications achieved",
      "Full-stack development expertise from planning to deployment",
      "Proven track record in competitive programming",
      "Strong foundation in both technical and soft skills"
    ],
    personality_traits: [
      "Resilient",
      "Logical Thinker",
      "Problem Solver",
      "Quick Learner",
      "Creative",
      "Versatile",
      "Detail-Oriented",
      "Team Player"
    ],
    career_focus: "Building meaningful and innovative web solutions through creative problem-solving, continuous learning, and leveraging diverse technical expertise to deliver impactful digital experiences.",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

async function populateAbout() {
  try {
    console.log("Starting to populate about information...");
    
    const result = await convex.mutation("about:bulkAddAbout", {
      entries: aboutData
    });
    
    console.log("Successfully added about information:", result);
    console.log(`Added ${aboutData.length} about entry to the database.`);
    
  } catch (error) {
    console.error("Error populating about information:", error);
    throw error;
  }
}

// Run the population if this script is executed directly
if (require.main === module) {
  populateAbout()
    .then(() => {
      console.log("About population completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Failed to populate about information:", error);
      process.exit(1);
    });
}

module.exports = { populateAbout, aboutData };