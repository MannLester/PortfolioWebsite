'use client';

import { useState } from 'react';
import Navigation from '@/components/shared/Navigation';

export default function Projects() {
  const [activeDesign, setActiveDesign] = useState<'creative' | 'professional' | 'simple'>('creative');

  return (
    <>
      <Navigation activeDesign={activeDesign} onDesignChange={setActiveDesign} />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <h1 className={`${activeDesign}-heading text-center mb-8`}>
            My Projects
          </h1>
          <p className={`${activeDesign}-text text-center mb-12`}>
            Here are some of my recent projects. Each demonstrates different aspects of my technical skills.
          </p>
          
          {/* Project Grid - Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <div
                key={project}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden
                  ${activeDesign === 'creative' ? 'border-2 border-creative-primary/20' : ''}
                  ${activeDesign === 'professional' ? 'border border-professional-secondary/20' : ''}
                  ${activeDesign === 'simple' ? 'border border-simple-primary/10' : ''}
                `}
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-700" />
                <div className="p-6">
                  <h3 className={`${activeDesign}-subheading mb-2`}>Project {project}</h3>
                  <p className={`${activeDesign}-text text-sm mb-4`}>
                    A brief description of project {project} and its key features.
                  </p>
                  <div className="flex gap-2">
                    <button className={`btn-${activeDesign} text-sm py-2`}>
                      View Project
                    </button>
                    <button className={`btn-${activeDesign} text-sm py-2`}>
                      Source Code
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
