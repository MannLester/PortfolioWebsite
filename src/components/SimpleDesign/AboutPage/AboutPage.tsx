'use client';

import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="max-w-2xl mx-auto">
        {/* Profile Section */}
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="simple-heading mb-4"
          >
            Mann Lester
          </motion.h1>
          <motion.p
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
            className="simple-text text-simple-secondary"
          >
            Full Stack Developer
          </motion.p>
        </div>

        {/* About Section */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="simple-subheading mb-4">About Me</h2>
          <p className="simple-text mb-4">
            I'm a full stack developer with a passion for creating clean, efficient, and user-friendly applications. 
            With 5 years of experience in web development, I specialize in building modern web applications using 
            React, Node.js, and related technologies.
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="simple-subheading mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'React',
              'TypeScript',
              'Node.js',
              'Next.js',
              'Tailwind CSS',
              'PostgreSQL',
              'AWS',
              'Git'
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-simple-primary text-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button className="btn-simple">
            Get in Touch
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;