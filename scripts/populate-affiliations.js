const affiliations = [
  {
    name: "Association of Committed Computer Science Students",
    acronym: "ACCESS",
    type: "Student Organization",
    description: "A student organization dedicated to promoting excellence in computer science education and fostering collaboration among computer science students.",
    role: "Member",
    status: "Active",
    join_date: "2022-08-01",
    activities: [
      "Participated in coding workshops and seminars",
      "Collaborated on academic projects with fellow members",
      "Attended tech talks and guest lectures"
    ],
    achievements: ["Active participant in organization events"],
    website_url: undefined,
    is_featured: true,
    order_index: 1,
  },
  {
    name: "College of Informatics and Computing Sciences",
    acronym: "CICS",
    type: "Academic Institution",
    description: "The college that houses the computer science and information technology programs, providing a comprehensive education in computing sciences.",
    role: "Student",
    status: "Active",
    join_date: "2021-08-01",
    activities: [
      "Pursuing Bachelor of Science in Computer Science",
      "Participating in academic research projects",
      "Engaging in college-wide activities and events"
    ],
    achievements: ["Dean's Lister", "Consistent academic performance"],
    website_url: undefined,
    is_featured: true,
    order_index: 2,
  },
  {
    name: "Support Team for an Enlightened Path",
    acronym: "STEP",
    type: "Advocacy Group",
    description: "An advocacy group focused on providing support and guidance to students in their academic and personal development journeys.",
    role: "Advocate",
    status: "Active",
    join_date: "2022-01-15",
    activities: [
      "Mentoring junior students",
      "Organizing support workshops",
      "Providing academic guidance and counseling"
    ],
    achievements: ["Successful mentorship of multiple students"],
    website_url: undefined,
    is_featured: true,
    order_index: 3,
  },
  {
    name: "Junior Philippine Computer Society - BatState-U Alangilan Chapter",
    acronym: "JPCS",
    type: "Professional Organization",
    description: "The student chapter of the Philippine Computer Society, promoting professionalism and excellence in the field of computing and information technology.",
    role: "Member",
    status: "Active",
    join_date: "2022-09-01",
    activities: [
      "Attended professional development seminars",
      "Participated in industry networking events",
      "Engaged in community outreach programs"
    ],
    achievements: ["Active participation in chapter activities"],
    website_url: undefined,
    is_featured: true,
    order_index: 4,
  },
  {
    name: "Student Coders for Resourceful and Innovative Programming Techniques",
    acronym: "SCRIPT",
    type: "Coding Club",
    description: "A coding club focused on developing innovative programming techniques and fostering collaborative learning among student developers.",
    role: "Member",
    status: "Active",
    join_date: "2022-02-01",
    activities: [
      "Participated in coding competitions",
      "Collaborated on open-source projects",
      "Conducted peer programming sessions"
    ],
    achievements: ["Contributor to club projects", "Active in coding competitions"],
    website_url: undefined,
    is_featured: true,
    order_index: 5,
  },
  {
    name: "CyberNex Innovate",
    acronym: undefined,
    type: "Innovation Hub",
    description: "An innovation hub focused on cybersecurity and emerging technologies, providing a platform for researchers and developers to collaborate on cutting-edge projects.",
    role: "Member",
    status: "Active",
    join_date: "2023-06-01",
    activities: [
      "Participating in cybersecurity research projects",
      "Attending innovation workshops",
      "Collaborating on tech startup initiatives"
    ],
    achievements: ["Contributor to cybersecurity research"],
    website_url: undefined,
    is_featured: true,
    order_index: 6,
  },
  {
    name: "BetterGovPH",
    acronym: undefined,
    type: "Civic Tech Organization",
    description: "A civic technology organization dedicated to improving government services through innovative digital solutions and citizen engagement platforms.",
    role: "Volunteer Developer",
    status: "Active",
    join_date: "2023-03-01",
    activities: [
      "Developing civic technology solutions",
      "Contributing to government digitization projects",
      "Participating in hackathons for social good"
    ],
    achievements: ["Contributor to government tech initiatives"],
    website_url: "https://www.bettergovph.com",
    is_featured: true,
    order_index: 7,
  },
];

async function populateAffiliations() {
  const { ConvexHttpClient } = require("convex/browser");
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  try {
    console.log("Starting to populate affiliations...");
    
    const result = await convex.mutation("affiliations:bulkAddAffiliations", {
      affiliations: affiliations
    });
    
    console.log("Successfully added affiliations:", result);
    console.log(`Added ${affiliations.length} affiliations to the database.`);
    
  } catch (error) {
    console.error("Error populating affiliations:", error);
    throw error;
  }
}

populateAffiliations();