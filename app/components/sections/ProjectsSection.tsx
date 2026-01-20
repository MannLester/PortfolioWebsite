"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Container } from '@/app/components/layout/Container';
import { Card, CardContent, CardHeader } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from 'next/image';

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [modalImage, setModalImage] = useState<{ url: string; title: string } | null>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const projects = useQuery(api.queries.projectsQueries.getAll);
  const projectFields = useQuery(api.queries.projectsQueries.getProjectFields);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileDropdownOpen(false);
      }
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target as Node)) {
        setIsDesktopDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Create filters dynamically from database + 'all' option
  const filters = projectFields ? [
    { key: 'all', label: 'All' },
    ...projectFields.map(field => ({
      key: field,
      label: field.charAt(0).toUpperCase() + field.slice(1) // Capitalize first letter
    }))
  ] : [{ key: 'all', label: 'All' }];

  // For desktop: split filters into visible and dropdown
  const visibleFilters = filters.slice(0, 4);
  const dropdownFilters = filters.slice(4);
  
  const filteredProjects = projects ? (
    activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.projectField === activeFilter)
  ) : [];

  // Get current filter label for mobile dropdown
  const currentFilterLabel = filters.find(f => f.key === activeFilter)?.label || 'All';
  
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
              {/* Mobile Dropdown */}
              <div className="md:hidden relative" ref={mobileDropdownRef}>
                <button
                  onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm font-medium text-foreground"
                >
                  {currentFilterLabel}
                  <svg 
                    className={`w-4 h-4 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                  </svg>
                </button>
                
                {isMobileDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-10">
                    {filters.map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => {
                          setActiveFilter(filter.key);
                          setIsMobileDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                          activeFilter === filter.key ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Filter Buttons */}
              <div className="hidden md:flex gap-2 p-1 bg-muted rounded-lg">
                {visibleFilters.map((filter) => (
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
                
                {/* Desktop Dropdown for additional filters */}
                {dropdownFilters.length > 0 && (
                  <div className="relative" ref={desktopDropdownRef}>
                    <button
                      onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        dropdownFilters.some(f => f.key === activeFilter)
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      ...
                      <svg 
                        className={`w-3 h-3 transition-transform ${isDesktopDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isDesktopDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-10 min-w-32">
                        {dropdownFilters.map((filter) => (
                          <button
                            key={filter.key}
                            onClick={() => {
                              setActiveFilter(filter.key);
                              setIsDesktopDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                              activeFilter === filter.key ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground'
                            }`}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Projects Grid - Single row horizontal scroll for all screen sizes */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide scroll-smooth select-none cursor-grab" 
            style={{scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch'}}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {filteredProjects.map((project) => (
              <Card key={project._id} hoverable className="flex flex-col flex-shrink-0 w-64 sm:w-72 md:w-72 lg:w-80 xl:w-88 select-text cursor-default pointer-events-auto h-120">
                {/* Project Image */}
                <div 
                  className="h-40 bg-muted rounded-t-lg flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => project.projectImageUrl && setModalImage({ url: project.projectImageUrl, title: project.projectTitle })}
                >
                  {project.projectImageUrl ? (
                    <Image 
                      src={project.projectImageUrl} 
                      alt={project.projectTitle} 
                      width={352}
                      height={160}
                      className="w-full h-full object-cover rounded-t-lg" 
                    />
                  ) : (
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl">🚀</div>
                  )}
                </div>
                
                <CardHeader className="flex-1 p-3 md:p-4 lg:p-5">
                  <div className="mb-2 md:mb-3">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-tight mb-2">
                      {project.projectTitle}
                    </h3>
                    <Badge variant={
                      project.projectField === 'web' ? 'primary' :
                      project.projectField === 'Mobile Development' ? 'secondary' :
                      project.projectField === 'ai' ? 'success' : 'default'
                    } className="text-xs shrink-0 px-2 py-1">
                      {project.projectField.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-xs sm:text-sm md:text-sm lg:text-base mb-3 lg:mb-4 line-clamp-3 leading-relaxed">
                    {project.projectDesc}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 lg:gap-1.5 mb-3 lg:mb-4">
                    {project.projectTech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs px-1.5 lg:px-2 py-0.5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 p-3 md:p-4 lg:p-5">
                  <div className="flex gap-2">
                    {project.isDeployed && project.projectLiveLink && (
                      <Button size="sm" className="flex-1 text-xs sm:text-sm py-1.5 lg:py-2" onClick={() => window.open(project.projectLiveLink, '_blank')}>
                        Live Demo
                      </Button>
                    )}
                    {project.projectGithubLink && (
                      <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm py-1.5 lg:py-2" onClick={() => window.open(project.projectGithubLink, '_blank')}>
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

        {/* Image Modal */}
        {modalImage && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setModalImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <button
                onClick={() => setModalImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Image
                src={modalImage.url}
                alt={modalImage.title}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <p className="text-white text-center mt-4 text-lg font-medium">{modalImage.title}</p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}