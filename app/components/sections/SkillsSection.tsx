"use client";

import React, { useState } from 'react';
import { Container } from '@/app/components/layout/Container';
import { Badge } from '@/app/components/ui/Badge';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function SkillsSection() {
  const skills = useQuery(api.queries.skillsQueries.getAll);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  if (!skills) {
    return (
      <section className="py-20 bg-background" id="skills">
        <Container>
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading skills...</p>
          </div>
        </Container>
      </section>
    );
  }
  
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
          
          {/* Skill Category Cards */}
          {/* Mobile: Vertical list with View More, Desktop: Grid */}
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Mobile vertical list */}
            <div className="md:hidden space-y-4">
              {(showAllSkills ? skills : skills.slice(0, 3)).map((skill) => {
                const isExpanded = expandedCategories.has(skill._id);
                return (
                  <div 
                    key={skill._id} 
                    className="bg-card border border-border rounded-lg transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Header: Icon + Title + Primary Skills */}
                    <button
                      onClick={() => toggleCategory(skill._id)}
                      className="w-full p-4 text-left hover:bg-accent/50 rounded-lg transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl mt-0.5">
                          {skill.skillIcon}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">
                            {skill.skillTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {skill.skillSubtitle.join(", ")}
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
                          {skill.skillMore.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* View More / View Less Button */}
              {skills.length > 3 && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setShowAllSkills(!showAllSkills)}
                    className="px-6 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {showAllSkills ? 'View Less' : 'View More'}
                  </button>
                </div>
              )}
            </div>
            
            {/* Desktop grid layout */}
            <div className="hidden md:contents">
              {skills.map((skill) => {
                const isExpanded = expandedCategories.has(skill._id);
                return (
                  <div 
                    key={skill._id} 
                    className="bg-card border border-border rounded-lg transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Header: Icon + Title + Primary Skills */}
                    <button
                      onClick={() => toggleCategory(skill._id)}
                      className="w-full p-4 text-left hover:bg-accent/50 rounded-lg transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl mt-0.5">
                          {skill.skillIcon}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">
                            {skill.skillTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {skill.skillSubtitle.join(", ")}
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
                          {skill.skillMore.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}