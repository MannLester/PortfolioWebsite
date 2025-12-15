"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface Experience {
  _id: string;
  position: string;
  company: string;
  location?: string;
  duration: string;
  start_date: string;
  end_date?: string;
  description: string[];
  employment_type: string;
  skills_used?: string[];
  is_current: boolean;
  order_index: number;
}

const ExperienceDisplay = () => {
  const experiences = useQuery(api.experiences.getAllExperiences);

  if (experiences === undefined) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/60">Loading experiences...</div>
      </div>
    );
  }

  const getEmploymentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-green-600';
      case 'freelance':
        return 'bg-blue-600';
      case 'internship':
        return 'bg-purple-600';
      case 'part-time':
        return 'bg-yellow-600';
      case 'contract':
        return 'bg-orange-600';
      case 'apprenticeship':
        return 'bg-pink-600';
      default:
        return 'bg-gray-600';
    }
  };

  const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
    return (
      <div className="relative">
        {/* Timeline line */}
        {index < experiences.length - 1 && (
          <div className="absolute left-4 top-16 w-0.5 h-full bg-white/20 z-0"></div>
        )}
        
        {/* Timeline dot */}
        <div className="absolute left-3 top-6 w-2 h-2 bg-blue-500 rounded-full z-10"></div>
        
        {/* Experience card */}
        <div className="ml-12 mb-8 bg-[#2f2f2f] border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-white">{experience.position}</h3>
                <span className={`px-2 py-1 text-white text-xs rounded-full ${getEmploymentTypeColor(experience.employment_type)}`}>
                  {experience.employment_type}
                </span>
                {experience.is_current && (
                  <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full animate-pulse">
                    Current
                  </span>
                )}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-white/70 mb-3">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-medium text-blue-400">{experience.company}</span>
                </div>
                {experience.location && (
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C19.0525 4.32468 19.5917 5.13867 19.9509 6.03192" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>{experience.location}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>{experience.duration}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <ul className="space-y-2">
              {experience.description.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/80">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          {experience.skills_used && experience.skills_used.length > 0 && (
            <div>
              <h4 className="text-white/60 text-xs font-medium mb-2 uppercase tracking-wide">Skills Used</h4>
              <div className="flex flex-wrap gap-2">
                {experience.skills_used.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md hover:bg-white/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const totalExperience = experiences.length;
  const currentJobs = experiences.filter(exp => exp.is_current).length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white">Work Experience</h1>
          <p className="text-white/60 mt-1">
            {totalExperience} positions • {currentJobs} current {currentJobs === 1 ? 'role' : 'roles'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors">
            Download Resume
          </button>
        </div>
      </header>

      {/* Experience Timeline */}
      <div className="flex-1 overflow-y-auto p-6">
        {experiences && experiences.length > 0 ? (
          <div className="max-w-4xl">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-2">Professional Journey</h2>
              <p className="text-white/60 text-sm">
                A timeline of my professional experience and career growth.
              </p>
            </div>
            
            <div className="relative">
              {experiences
                .sort((a, b) => a.order_index - b.order_index)
                .map((experience, index) => (
                  <ExperienceCard key={experience._id} experience={experience} index={index} />
                ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Experience Found</h3>
              <p className="text-white/60">Your work experience will appear here once it&apos;s added.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceDisplay;