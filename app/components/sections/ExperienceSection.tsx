import React from 'react';
import { Container } from '@/app/components/layout/Container';
import { Badge } from '@/app/components/ui/Badge';
import { portfolioData } from '@/app/data/portfolio';

export function ExperienceSection() {
  const { experience } = portfolioData;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };
  
  return (
    <section className="py-20 bg-background" id="experience">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Experience</h2>
          
          {/* Timeline */}
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* Timeline Line */}
                {index !== experience.length - 1 && (
                  <div className="absolute left-6 top-16 w-px h-full bg-border" />
                )}
                
                <div className="flex gap-6">
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center mt-2">
                    <div className="w-6 h-6 bg-primary-foreground rounded-full" />
                  </div>
                  
                  {/* Experience Content */}
                  <div className="flex-1 bg-card border border-border rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.position}</h3>
                        <p className="text-lg text-primary font-medium">{exp.company}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</div>
                        <div className="text-right">{exp.location}</div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    
                    {/* Responsibilities */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Key Achievements:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {exp.responsibilities.slice(0, 3).map((responsibility, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-primary mr-2 mt-1">•</span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Technologies */}
                    <div>
                      <h4 className="font-medium mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
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