const { ConvexHttpClient } = require("convex/browser");

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

const contactsData = [
  {
    contact_type: "number",
    contact_name: "Contact Number", 
    contact_link: "0915-333-6207",
    is_active: true,
  },
  {
    contact_type: "link",
    contact_name: "LinkedIn",
    contact_link: "https://www.linkedin.com/in/mann-lester-magbuhos-182ba128b/",
    is_active: true,
  },
  {
    contact_type: "link", 
    contact_name: "GitHub",
    contact_link: "www.github.com/MannLester",
    is_active: true,
  },
  {
    contact_type: "email",
    contact_name: "Email",
    contact_link: "mannlesterli@gmail.com",
    is_active: true,
  },
  {
    contact_type: "link",
    contact_name: "Website",
    contact_link: "https://mann-website-seven.vercel.app",
    is_active: true,
  }
];

async function populateContacts() {
  try {
    console.log("Starting to populate contacts...");
    
    const result = await convex.mutation("contacts:bulkAddContacts", {
      contacts: contactsData
    });
    
    console.log("Successfully added contacts:", result);
    console.log(`Added ${contactsData.length} contacts to the database.`);
    
  } catch (error) {
    console.error("Error populating contacts:", error);
    throw error;
  }
}

// Run the population if this script is executed directly
if (require.main === module) {
  populateContacts()
    .then(() => {
      console.log("Contacts population completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Failed to populate contacts:", error);
      process.exit(1);
    });
}

module.exports = { populateContacts, contactsData };