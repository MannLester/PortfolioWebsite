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
      url: "https://linkedin.com/in/mann-lee",
      icon: "/images/icons/github-icon.png", // Using github icon until LinkedIn icon is added
      username: "/in/mann-lee"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/mannlee_dev",
      icon: "/images/icons/github-icon.png", // Using github icon until Twitter icon is added
      username: "@mannlee_dev"
    }
  ],
  
  skills: [
    // Frontend
    { name: "React", category: "frontend", level: 5, icon: "react", color: "#61DAFB" },
    { name: "Next.js", category: "frontend", level: 5, icon: "nextjs", color: "#000000" },
    { name: "TypeScript", category: "frontend", level: 4, icon: "typescript", color: "#3178C6" },
    { name: "Tailwind CSS", category: "frontend", level: 5, icon: "tailwindcss", color: "#06B6D4" },
    { name: "Flutter", category: "mobile", level: 4, icon: "flutter", color: "#02569B" },
    
    // Backend
    { name: "Node.js", category: "backend", level: 4, icon: "nodejs", color: "#339933" },
    { name: "Python", category: "backend", level: 4, icon: "python", color: "#3776AB" },
    { name: "Express.js", category: "backend", level: 4, icon: "express", color: "#000000" },
    { name: "Firebase", category: "backend", level: 4, icon: "firebase", color: "#FFCA28" },
    
    // Database
    { name: "PostgreSQL", category: "database", level: 4, icon: "postgresql", color: "#336791" },
    { name: "MongoDB", category: "database", level: 3, icon: "mongodb", color: "#47A248" },
    { name: "Supabase", category: "database", level: 4, icon: "supabase", color: "#3ECF8E" },
    
    // AI/ML
    { name: "TensorFlow", category: "ai", level: 3, icon: "tensorflow", color: "#FF6F00" },
    { name: "PyTorch", category: "ai", level: 3, icon: "pytorch", color: "#EE4C2C" },
    
    // Tools
    { name: "Git", category: "tools", level: 5, icon: "git", color: "#F05032" },
    { name: "Docker", category: "tools", level: 3, icon: "docker", color: "#2496ED" },
    { name: "Vercel", category: "tools", level: 4, icon: "vercel", color: "#000000" }
  ],
  
  projects: [
    {
      id: "contractor-ranking",
      title: "Contractor Ranking Platform",
      description: "A data-driven system for ranking contractors using machine learning algorithms",
      longDescription: "Built a comprehensive contractor ranking platform that analyzes performance metrics, client feedback, and project outcomes to provide data-driven contractor recommendations. Features real-time analytics and predictive scoring.",
      image: "/images/projects/contractor-ranking.jpg",
      gallery: ["/images/projects/contractor-1.jpg", "/images/projects/contractor-2.jpg"],
      technologies: ["Next.js", "Supabase", "Machine Learning", "TypeScript", "Tailwind CSS"],
      features: [
        "ML-powered contractor scoring algorithm",
        "Real-time performance analytics",
        "Interactive ranking dashboard",
        "Automated data processing pipeline",
        "Client feedback integration",
        "Predictive project outcomes"
      ],
      githubUrl: "https://github.com/mannlee/contractor-ranking",
      liveUrl: "https://contractor-ranking.vercel.app",
      status: "completed",
      category: "web",
      startDate: "2023-08-01",
      endDate: "2023-11-15"
    },
    {
      id: "smart-home-app",
      title: "Smart Home App",
      description: "IoT application for controlling smart devices with Flutter and Firebase",
      longDescription: "Developed a cross-platform mobile application for smart home automation. Users can control lights, temperature, security systems, and more through an intuitive interface with real-time device status updates.",
      image: "/images/projects/smart-home.jpg",
      gallery: ["/images/projects/smart-home-1.jpg", "/images/projects/smart-home-2.jpg"],
      technologies: ["Flutter", "Firebase", "IoT", "Dart", "Cloud Functions"],
      features: [
        "Real-time device control",
        "Voice command integration",
        "Energy usage monitoring",
        "Automated scheduling",
        "Security system integration",
        "Multi-user access control"
      ],
      githubUrl: "https://github.com/mannlee/smart-home-app",
      liveUrl: "https://play.google.com/store/apps/details?id=com.mannlee.smarthome",
      status: "completed",
      category: "mobile",
      startDate: "2023-03-01",
      endDate: "2023-07-30"
    },
    {
      id: "image-classification",
      title: "Image Classification Tool",
      description: "Deep learning model for image recognition using Python and TensorFlow",
      longDescription: "Created an advanced image classification system using convolutional neural networks. The tool can identify and categorize images with high accuracy, featuring a web interface for easy interaction and batch processing capabilities.",
      image: "/images/projects/image-classification.jpg",
      gallery: ["/images/projects/image-class-1.jpg", "/images/projects/image-class-2.jpg"],
      technologies: ["Python", "TensorFlow", "CNN", "Flask", "OpenCV"],
      features: [
        "99.2% accuracy on test dataset",
        "Real-time image processing",
        "Batch classification support",
        "Custom model training interface",
        "RESTful API for integration",
        "Confidence scoring system"
      ],
      githubUrl: "https://github.com/mannlee/image-classification",
      liveUrl: "https://image-classifier.mannlee.dev",
      status: "completed",
      category: "ai",
      startDate: "2023-01-15",
      endDate: "2023-03-30"
    }
  ],
  
  experience: [
    {
      id: "fullstack-dev-present",
      company: "Tech Innovation Labs",
      position: "Full-Stack Developer",
      description: "Building scalable web & AI apps for enterprise clients",
      responsibilities: [
        "Lead development of 10+ client projects from conception to deployment",
        "Architect and implement scalable web applications using React and Node.js",
        "Integrate machine learning models into production web applications",
        "Mentor junior developers and conduct comprehensive code reviews",
        "Collaborate with cross-functional teams to deliver high-quality products"
      ],
      technologies: ["React", "Next.js", "Node.js", "Python", "TensorFlow", "PostgreSQL"],
      startDate: "2024-01-01",
      location: "San Francisco, CA",
      type: "full-time",
      logo: "/images/companies/tech-innovation.jpg"
    },
    {
      id: "freelance-dev",
      company: "Freelance Developer",
      position: "Full-Stack & Mobile Developer",
      description: "Delivered multiple projects for web and mobile platforms",
      responsibilities: [
        "Developed 15+ web applications using modern JavaScript frameworks",
        "Built cross-platform mobile apps using Flutter and React Native",
        "Implemented responsive designs and optimized application performance",
        "Provided technical consulting for startup clients",
        "Managed client relationships and project timelines"
      ],
      technologies: ["React", "Flutter", "Firebase", "Node.js", "MongoDB"],
      startDate: "2022-03-01",
      endDate: "2023-12-31",
      location: "Remote",
      type: "contract",
      logo: "/images/companies/freelance.jpg"
    }
  ]
};