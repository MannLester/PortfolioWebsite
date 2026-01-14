"use client";

import React, { useState } from 'react';
import { Container } from '@/app/components/layout/Container';
import { Card, CardContent, CardHeader } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { portfolioData } from '@/app/data/portfolio';

export function ProjectsSection() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'ai'>('all');
  
  const filters = [
    { key: 'all' as const, label: 'All' },
    { key: 'web' as const, label: 'Web' },
    { key: 'mobile' as const, label: 'Mobile' },
    { key: 'ai' as const, label: 'AI' }
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  return (
    <section className="py-20 bg-muted/50" id="projects">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Title and Filter Buttons on same line */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6 md:gap-0">
            <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">Featured Projects</h2>
            
            {/* Filter Buttons */}
            <div className="flex justify-center">
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeFilter === filter.key
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} hoverable className="h-full flex flex-col">
                {/* Project Image */}
                <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                  <div className="text-4xl">🚀</div>
                </div>
                
                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <Badge variant={
                      project.category === 'web' ? 'primary' :
                      project.category === 'mobile' ? 'secondary' :
                      project.category === 'ai' ? 'success' : 'default'
                    }>
                      {project.category.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button size="sm" className="flex-1">
                        Live Demo
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" className="flex-1">
                        GitHub
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found for the selected filter.</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}