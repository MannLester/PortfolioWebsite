'use client';

import { useState } from 'react';
import Navigation from '@/components/shared/Navigation';
import { motion } from 'framer-motion';
import { DownloadIcon } from '@heroicons/react/24/outline';

export default function Resume() {
  const [activeDesign, setActiveDesign] = useState<'creative' | 'professional' | 'simple'>('creative');

  return (
    <>
      <Navigation activeDesign={activeDesign} onDesignChange={setActiveDesign} />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className={`${activeDesign}-heading`}>Resume</h1>
            <button className={`btn-${activeDesign} flex items-center gap-2`}>
              <DownloadIcon className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8
              ${activeDesign === 'creative' ? 'border-2 border-creative-primary/20' : ''}
              ${activeDesign === 'professional' ? 'border border-professional-secondary/20' : ''}
              ${activeDesign === 'simple' ? 'border border-simple-primary/10' : ''}
            `}
          >
            {/* Contact Information */}
            <div className="text-center mb-8">
              <h2 className={`${activeDesign}-heading mb-2`}>Mann Lee</h2>
              <p className={`${activeDesign}-text text-gray-600 dark:text-gray-300`}>
                Full Stack Developer | UI/UX Designer
              </p>
              <p className={`${activeDesign}-text text-gray-500 dark:text-gray-400`}>
                contact@example.com | (123) 456-7890
              </p>
            </div>

            {/* Experience */}
            <section className="mb-8">
              <h3 className={`${activeDesign}-subheading mb-4`}>Experience</h3>
              <div className="space-y-4">
                <div>
                  <h4 className={`${activeDesign}-text font-semibold`}>Senior Developer</h4>
                  <p className={`${activeDesign}-text text-gray-600 dark:text-gray-300`}>
                    Tech Corp | 2022 - Present
                  </p>
                  <ul className={`${activeDesign}-text list-disc list-inside mt-2 space-y-1`}>
                    <li>Led development of enterprise web applications</li>
                    <li>Managed team of 5 developers</li>
                    <li>Implemented CI/CD pipelines</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h3 className={`${activeDesign}-subheading mb-4`}>Education</h3>
              <div>
                <h4 className={`${activeDesign}-text font-semibold`}>
                  Master's in Computer Science
                </h4>
                <p className={`${activeDesign}-text text-gray-600 dark:text-gray-300`}>
                  Tech University | 2020
                </p>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h3 className={`${activeDesign}-subheading mb-4`}>Skills</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'React', 'TypeScript', 'Node.js', 'Next.js',
                  'Python', 'AWS', 'Docker', 'GraphQL'
                ].map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm
                      ${activeDesign === 'creative' ? 'bg-creative-primary/10 text-creative-primary' : ''}
                      ${activeDesign === 'professional' ? 'bg-professional-primary/10 text-professional-primary' : ''}
                      ${activeDesign === 'simple' ? 'bg-simple-primary/10 text-simple-primary' : ''}
                    `}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </motion.div>
        </div>
      </main>
    </>
  );
}
