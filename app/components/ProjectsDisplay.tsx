"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface Project {
  _id: string;
  proj_name: string;
  proj_desc?: string;
  proj_repo_link: string;
  proj_deployed_link?: string;
  frontend_stack: Array<{ language: string; percentage: number }>;
  backend_stack: Array<{ language: string; percentage: number }>;
  database_stack: Array<{ language: string; percentage: number }>;
  isFeatured: boolean;
  isDeployed: boolean;
  stars?: number;
  forks?: number;
  created_at: string;
  updated_at: string;
}

const ProjectsDisplay = () => {
  const projects = useQuery(api.projects.getAllProjects);
  const featuredProjects = useQuery(api.projects.getFeaturedProjects);

  if (projects === undefined) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/60">Loading projects...</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTopLanguages = (stacks: Array<{ language: string; percentage: number }>) => {
    return stacks
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3)
      .map(stack => stack.language);
  };

  const ProjectCard = ({ project }: { project: Project }) => {
    const allStacks = [...project.frontend_stack, ...project.backend_stack, ...project.database_stack];
    const topLanguages = getTopLanguages(allStacks);

    return (
      <div className="bg-[#2f2f2f] border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-white">{project.proj_name}</h3>
              {project.isFeatured && (
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  Featured
                </span>
              )}
              {project.isDeployed && (
                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                  Live
                </span>
              )}
            </div>
            <p className="text-white/70 text-sm mb-4">{project.proj_desc || 'No description available'}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {topLanguages.map((language, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md"
            >
              {language}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-white/60 text-sm">
            {project.stars !== undefined && (
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="currentColor"/>
                </svg>
                {project.stars}
              </div>
            )}
            {project.forks !== undefined && (
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M18 9V15" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 9V15" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {project.forks}
              </div>
            )}
            <span>{formatDate(project.created_at)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={project.proj_repo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded-md transition-colors"
            >
              Code
            </a>
            {project.proj_deployed_link && (
              <a
                href={project.proj_deployed_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
              >
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white">GitHub Projects</h1>
          <p className="text-white/60 mt-1">
            {projects?.length || 0} projects • {featuredProjects?.length || 0} featured
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors">
            Sort
          </button>
        </div>
      </header>

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 1V3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 21V23" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2"/>
                  <path d="M1 12H3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 12H23" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
              <p className="text-white/60">Your GitHub projects will appear here once they&apos;re synced.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsDisplay;