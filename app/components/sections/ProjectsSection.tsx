"use client";

import React, { useState } from 'react';
import { Container } from '@/app/components/layout/Container';
import { Card, CardContent, CardHeader } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from 'next/image';

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const projects = useQuery(api.queries.projectsQueries.getAll);
  const projectFields = useQuery(api.queries.projectsQueries.getProjectFields);
  
  // Create filters dynamically from database + 'all' option
  const filters = projectFields ? [
    { key: 'all', label: 'All' },
    ...projectFields.map(field => ({
      key: field,
      label: field.charAt(0).toUpperCase() + field.slice(1) // Capitalize first letter
    }))
  ] : [{ key: 'all', label: 'All' }];
  
  const filteredProjects = projects ? (
    activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.projectField === activeFilter)
  ) : [];
  
  if (!projects || !projectFields) {
    return (
      <section className="py-20 bg-muted/50" id="projects">
        <Container>
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </Container>
      </section>
    );
  }
  
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
              <Card key={project._id} hoverable className="h-full flex flex-col">
                {/* Project Image */}
                <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center overflow-hidden">
                  {project.projectImageUrl ? (
                    <Image 
                      src={project.projectImageUrl} 
                      alt={project.projectTitle} 
                      width={400}
                      height={225}
                      className="w-full h-full object-cover rounded-t-lg" 
                    />
                  ) : (
                    <div className="text-4xl">🚀</div>
                  )}
                </div>
                
                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold">{project.projectTitle}</h3>
                    <Badge variant={
                      project.projectField === 'web' ? 'primary' :
                      project.projectField === 'Mobile Development' ? 'secondary' :
                      project.projectField === 'ai' ? 'success' : 'default'
                    }>
                      {project.projectField.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{project.projectDesc}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.projectTech.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.projectTech.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.projectTech.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    {project.isDeployed && project.projectLiveLink && (
                      <Button size="sm" className="flex-1" onClick={() => window.open(project.projectLiveLink, '_blank')}>
                        Live Demo
                      </Button>
                    )}
                    {project.projectGithubLink && (
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => window.open(project.projectGithubLink, '_blank')}>
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