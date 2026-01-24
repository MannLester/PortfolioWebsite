import { PortfolioData } from '@/app/types/portfolio';

export const roles = [
  {
    title: "Full-Stack Developer",
    color: "#00e5ff", // Electric Cyan
    theme: "cyan"
  },
  {
    title: "Data Scientist", 
    color: "#10b981", // Emerald Green
    theme: "emerald"
  },
  {
    title: "AI/ML Engineer",
    color: "#8b5cf6", // Purple/Violet
    theme: "purple"
  },
  {
    title: "Mobile Developer",
    color: "#f97316", // Sunset Orange
    theme: "orange"
  },
  {
    title: "Database Management",
    color: "#64748b", // Liquid Chrome
    theme: "chrome"
  }
];

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Mann Lee",
    title: "The 'Everything' Developer",
    bio: "While most developers stay in their lane, I have the agility to switch lanes as the problem demands. By combining my resourcefulness and innate curiosity, I master new technologies quickly and effectively. This allows me to build cohesive, intelligent systems that leverages key technologies in multiple fields",
    location: "Batangas, Philippines",
    email: "mannlester@gmail.com",
    phone: "+63 915 333 6207",
    website: "https://mannlee.dev",
    avatar: "/images/avatar.jpg"
  },
  
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/MannLester",
      icon: "/images/icons/github-icon.png",
      username: "@mannlee"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mann-lester-magbuhos-182ba1281/",
      icon: "/images/icons/linkedin logo.png", // Using github icon until LinkedIn icon is added
      username: "/in/mann-lee"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/mann.lester.magbuhos.2024",
      icon: "/images/icons/facebook logo.png", // Using github icon until Twitter icon is added
      username: "@mannlee_dev"
    }
  ],
};