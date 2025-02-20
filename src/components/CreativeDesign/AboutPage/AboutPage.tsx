'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-creative-primary/5 to-creative-secondary/5 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h1 className="creative-heading mb-6">
            Hello, I'm <span className="text-creative-accent">Mann Lester</span>
          </h1>
          <p className="creative-text text-creative-secondary max-w-2xl">
            A passionate developer crafting beautiful digital experiences with code and creativity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className="creative-subheading">My Journey</h2>
            <p className="creative-text">
              With over 5 years of experience in web development, I've worked on projects ranging from 
              small business websites to large-scale enterprise applications. My passion lies in creating 
              intuitive and engaging user experiences that make a difference.
            </p>
            <button className="btn-creative group flex items-center space-x-2">
              <span>View My Work</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <h2 className="creative-subheading">Skills & Expertise</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                'React/Next.js',
                'TypeScript',
                'Tailwind CSS',
                'Node.js',
                'UI/UX Design',
                'REST APIs',
                'GraphQL',
                'AWS'
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-creative-primary font-creative"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutPage;