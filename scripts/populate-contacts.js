const { ConvexHttpClient } = require("convex/browser");

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

const contactData = [
  {
    phone: "0915-333-6207",
    email: "mannlester@gmail.com",
    linkedin: "https://www.linkedin.com/in/mann-lester-magbuhos-182ba2281/",
    github: "www.github.com/MannLester",
    website: "https://portfolio-website-seven-vercel.app",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

async function populateContacts() {
  try {
    console.log("Starting to populate contact information...");
    
    const result = await convex.mutation("contacts:bulkAddContactInfo", {
      entries: contactData
    });
    
    console.log("Successfully added contact information:", result);
    console.log(`Added ${contactData.length} contact entry to the database.`);
    
  } catch (error) {
    console.error("Error populating contact information:", error);
    throw error;
  }
}

// Run the population if this script is executed directly
if (require.main === module) {
  populateContacts()
    .then(() => {
      console.log("Contact population completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Failed to populate contact information:", error);
      process.exit(1);
    });
}

module.exports = { populateContacts, contactData };