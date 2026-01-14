"use client";

import React, { useState } from 'react';
import { Container } from '@/app/components/layout/Container';
import { Badge } from '@/app/components/ui/Badge';
import { portfolioData } from '@/app/data/portfolio';

export function SkillsSection() {
  const { skills } = portfolioData;
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
  const categoryConfig = {
    frontend: {
      title: "Modern Web Stacks",
      icon: "🎨",
      primary: ["Next.js", "React", "TypeScript"],
      secondary: ["Tailwind CSS", "HTML5/CSS3", "JavaScript"]
    },
    backend: {
      title: "Server Development",
      icon: "⚙️",
      primary: ["Node.js", "Python", "Express.js"],
      secondary: ["FastAPI", "REST APIs", "GraphQL"]
    },
    database: {
      title: "Data Management",
      icon: "🗄️",
      primary: ["PostgreSQL", "MongoDB", "Supabase"],
      secondary: ["Redis", "Database Design", "Query Optimization"]
    },
    mobile: {
      title: "Mobile Development",
      icon: "📱",
      primary: ["Flutter", "React Native"],
      secondary: ["Dart", "iOS", "Android", "Cross-Platform"]
    },
    ai: {
      title: "AI & Machine Learning",
      icon: "🤖",
      primary: ["TensorFlow", "PyTorch"],
      secondary: ["Scikit-learn", "Data Science", "Neural Networks", "NLP"]
    },
    tools: {
      title: "Development Tools",
      icon: "🛠️",
      primary: ["Git", "Docker", "Vercel"],
      secondary: ["CI/CD", "Testing", "Monitoring", "Deployment"]
    }
  };
  
  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };
  
  return (
    <section className="py-20 bg-background" id="skills">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Skills</h2>
          
          {/* Expandable Skill Category Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categoryConfig).map(([category, config]) => {
              const isExpanded = expandedCategories.has(category);
              return (
                <div 
                  key={category} 
                  className="bg-card border border-border rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  {/* Header: Icon + Title + Primary Skills */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full p-4 text-left hover:bg-accent/50 rounded-lg transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">
                        {config.icon}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">
                          {config.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {config.primary.join(", ")}
                        </p>
                      </div>
                      {/* Accordion Toggle Icon */}
                      <div className={`transition-transform duration-300 mt-1 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                  
                  {/* Expandable Content - Additional Skills */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-4 pb-4 pt-0 border-t border-border/50">
                      <p className="text-sm text-muted-foreground mt-3">
                        {config.secondary.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* All Skills as Badges */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-center mb-6">All Technologies</h3>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {skills.map((skill) => (
                <Badge 
                  key={skill.name} 
                  variant={skill.level >= 4 ? 'primary' : 'secondary'}
                  className="text-sm px-3 py-1"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}