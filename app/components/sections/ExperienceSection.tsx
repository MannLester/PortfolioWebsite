"use client"

import { Container } from '@/app/components/layout/Container';
import { Badge } from '@/app/components/ui/Badge';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ExperienceSection() {
  const experience = useQuery(api.queries.experienceQueries.getAll);
  
  if (!experience) {
    return (
      <section className="py-20 bg-background" id="experience">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading experience...</p>
          </div>
        </Container>
      </section>
    );
  }
  
  return (
    <section className="py-20 bg-background" id="experience">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Experience</h2>
          
          {/* Experience Cards */}
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp._id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.experienceRole}</h3>
                    <p className="text-lg text-primary font-medium">{exp.experienceCompany}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>{exp.experienceStartDate} - {exp.experienceEndDate || 'Present'}</div>
                    <div className="text-right">{exp.experienceLocation}</div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{exp.experienceDesc}</p>
                
                {/* Responsibilities */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Key Tasks:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {exp.experienceTasks.slice(0, 3).map((task, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Technologies */}
                <div>
                  <h4 className="font-medium mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {exp.experienceTechStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}