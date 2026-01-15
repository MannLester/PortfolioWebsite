"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from '@/app/components/layout/Container';


const roles = [
  {
    title: "Full-Stack Developer",
    color: "#00e5ff", // Electric Cyan
  },
  {
    title: "Data Scientist", 
    color: "#10b981", // Emerald Green
  },
  {
    title: "AI/ML Engineer",
    color: "#8b5cf6", // Purple/Violet
  },
  {
    title: "Mobile Developer",
    color: "#f97316", // Sunset Orange
  },
  {
    title: "Database Management",
    color: "#64748b", // Liquid Chrome
  }
];

export function AboutSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  const currentRole = roles[currentRoleIndex];
  
  // Replicate Hero section timing and transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000); // Same 3 second timing as Hero
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-20 bg-muted/50" id="about">
      <Container size="xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">About Me</h2>
          
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
            {/* Profile Image with dynamic glow */}
            <div className="md:col-span-2 flex justify-center">
              <div 
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-muted rounded-2xl border border-border flex items-center justify-center transition-all duration-1000 ease-in-out"
                style={{
                  borderColor: currentRole.color,
                  boxShadow: `0 0 30px ${currentRole.color}20, 0 0 60px ${currentRole.color}10`,
                  transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <Image 
                  src="/images/pics/my_pic.png" 
                  alt="Mann Lee Profile" 
                  width={320}
                  height={320}
                  className="w-full h-full object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
            
            {/* About Content */}
            <div className="md:col-span-3">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                With the advancement of <span 
                  className="font-medium transition-all duration-1000 ease-in-out" 
                  style={{
                    color: currentRole.color,
                    textShadow: `0 0 10px ${currentRole.color}`,
                    transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >AI</span> and dissemination of information, a <span 
                  className="font-medium transition-all duration-1000 ease-in-out" 
                  style={{
                    color: currentRole.color,
                    textShadow: `0 0 8px ${currentRole.color}`,
                    transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >generalist</span> like me is greatly enhanced to be much more <span 
                  className="font-medium transition-all duration-1000 ease-in-out" 
                  style={{
                    color: currentRole.color,
                    textShadow: `0 0 8px ${currentRole.color}`,
                    transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >effective and productive</span>. While most developers decided to pick a lane, I can be on any lane depending on the <span 
                  className="font-medium transition-all duration-1000 ease-in-out" 
                  style={{
                    color: currentRole.color,
                    textShadow: `0 0 8px ${currentRole.color}`,
                    transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >problem and business goals</span> of the company.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                I am a developer that don&apos;t just <span 
                  className="font-medium transition-all duration-1000 ease-in-out" 
                  style={{
                    color: currentRole.color,
                    textShadow: `0 0 8px ${currentRole.color}`,
                    transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >code</span>. I <span 
                  className="font-medium transition-all duration-1000 ease-in-out" 
                  style={{
                    color: currentRole.color,
                    textShadow: `0 0 10px ${currentRole.color}`,
                    transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >ideate</span>.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              I believe that the <span 
                className="font-medium transition-all duration-1000 ease-in-out" 
                style={{
                  color: currentRole.color,
                  textShadow: `0 0 8px ${currentRole.color}`,
                  transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >best software</span> isn&apos;t built by following a checklist, but by understanding the <span 
                className="font-medium transition-all duration-1000 ease-in-out" 
                style={{
                  color: currentRole.color,
                  textShadow: `0 0 10px ${currentRole.color}`,
                  transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >&ldquo;Why&rdquo;</span> behind the <span 
                className="font-medium transition-all duration-1000 ease-in-out" 
                style={{
                  color: currentRole.color,
                  textShadow: `0 0 8px ${currentRole.color}`,
                  transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >&ldquo;What.&rdquo;</span> Because I work across <span 
                className="font-medium transition-all duration-1000 ease-in-out" 
                style={{
                  color: currentRole.color,
                  textShadow: `0 0 8px ${currentRole.color}`,
                  transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >multiple fields</span>, I can spot <span 
                className="font-medium transition-all duration-1000 ease-in-out" 
                style={{
                  color: currentRole.color,
                  textShadow: `0 0 10px ${currentRole.color}`,
                  transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >opportunities and technical hurdles</span> that specialists might miss.
              </p>
              {/* Tech Stack */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4">Technologies I work with:</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {[
                    { name: "React", icon: "/images/icons/react.png" },
                    { name: "Next.js", icon: "/images/icons/nextjs.png" },
                    { name: "Flutter", icon: "/images/icons/flutter-icon.png" },
                    { name: "Node.js", icon: "/images/icons/nodejs.png" },
                    { name: "Python", icon: "/images/icons/python-icon.png" },
                    { name: "Firebase", icon: "/images/icons/firebase.png" },
                    { name: "Supabase", icon: "/images/icons/supabase.png" },
                    { name: "Convex", icon: "/images/icons/convex.png" },
                    { name: "Github", icon: "/images/icons/github-icon.png" },  
                    { name: "Jupyter Notebook", icon: "/images/icons/jupyter-icon.png" },
                  ].map((tech) => (
                    <div 
                      key={tech.name} 
                      className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors group"
                    >
                      <Image 
                        src={tech.icon} 
                        alt={tech.name} 
                        width={16}
                        height={16}
                        className="md:w-5 md:h-5 transition-transform group-hover:scale-110"
                      />
                      <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                  {/* And many more indicator */}
                  <div className="flex items-center px-2 md:px-3 py-1.5 md:py-2 rounded-lg border border-border bg-card/30 opacity-60">
                    <span className="text-xs md:text-sm text-muted-foreground italic">
                      and many more...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}