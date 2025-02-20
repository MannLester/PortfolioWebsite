'use client';

import { motion } from 'framer-motion';
import { BriefcaseIcon, AcademicCapIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-professional-primary/5 to-transparent py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="professional-heading mb-4"
          >
            Mann Lester
          </motion.h1>
          <motion.p
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="professional-text text-professional-secondary max-w-2xl mx-auto"
          >
            Full Stack Developer | UI/UX Designer | Tech Enthusiast
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience Section */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <BriefcaseIcon className="w-6 h-6 text-professional-primary mr-2" />
              <h2 className="professional-subheading">Experience</h2>
            </div>
            <ul className="space-y-4 professional-text">
              <li>
                <h3 className="font-semibold">Senior Developer</h3>
                <p className="text-professional-secondary">Tech Corp • 2022-Present</p>
              </li>
              <li>
                <h3 className="font-semibold">Full Stack Developer</h3>
                <p className="text-professional-secondary">Digital Solutions Inc • 2020-2022</p>
              </li>
            </ul>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <AcademicCapIcon className="w-6 h-6 text-professional-primary mr-2" />
              <h2 className="professional-subheading">Education</h2>
            </div>
            <ul className="space-y-4 professional-text">
              <li>
                <h3 className="font-semibold">Master's in Computer Science</h3>
                <p className="text-professional-secondary">Tech University • 2020</p>
              </li>
              <li>
                <h3 className="font-semibold">Bachelor's in Software Engineering</h3>
                <p className="text-professional-secondary">State University • 2018</p>
              </li>
            </ul>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <CodeBracketIcon className="w-6 h-6 text-professional-primary mr-2" />
              <h2 className="professional-subheading">Technical Skills</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                'JavaScript/TypeScript',
                'React/Next.js',
                'Node.js',
                'Python',
                'AWS',
                'Docker',
                'GraphQL',
                'CI/CD'
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-professional-primary/10 rounded px-3 py-2 text-professional-primary text-sm font-medium"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <button className="btn-professional">
            Download Resume
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;