'use client';

import { useState } from 'react';
import Navigation from '@/components/shared/Navigation';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  const [activeDesign, setActiveDesign] = useState<'creative' | 'professional' | 'simple'>('creative');
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <Navigation 
        activeDesign={activeDesign} 
        onDesignChange={setActiveDesign} 
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
      />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className={`${activeDesign}-heading mb-4`}>Get in Touch</h1>
            <p className={`${activeDesign}-text text-gray-600 dark:text-gray-300 max-w-2xl mx-auto`}>
              Have a question or want to work together? Feel free to reach out using the form below
              or through any of the provided contact methods.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6
                ${activeDesign === 'creative' ? 'border-2 border-creative-primary/20' : ''}
                ${activeDesign === 'professional' ? 'border border-professional-secondary/20' : ''}
                ${activeDesign === 'simple' ? 'border border-simple-primary/10' : ''}
              `}
            >
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className={`${activeDesign}-text block mb-2`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`${activeDesign}-text block mb-2`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`${activeDesign}-text block mb-2`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Your message"
                  />
                </div>
                <button type="submit" className={`btn-${activeDesign} w-full`}>
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <EnvelopeIcon className={`w-6 h-6 text-${activeDesign}-primary`} />
                <div>
                  <h3 className={`${activeDesign}-subheading mb-1`}>Email</h3>
                  <p className={`${activeDesign}-text`}>contact@example.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <PhoneIcon className={`w-6 h-6 text-${activeDesign}-primary`} />
                <div>
                  <h3 className={`${activeDesign}-subheading mb-1`}>Phone</h3>
                  <p className={`${activeDesign}-text`}>(123) 456-7890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPinIcon className={`w-6 h-6 text-${activeDesign}-primary`} />
                <div>
                  <h3 className={`${activeDesign}-subheading mb-1`}>Location</h3>
                  <p className={`${activeDesign}-text`}>San Francisco, CA</p>
                </div>
              </div>

              {/* Social Links */}
              <div className={`mt-8 p-6 rounded-lg bg-${activeDesign}-primary/5`}>
                <h3 className={`${activeDesign}-subheading mb-4`}>Connect with Me</h3>
                <div className="flex justify-center space-x-4">
                  {/* Add your social media links here */}
                  <a href="#" className={`text-${activeDesign}-primary hover:opacity-80`}>
                    LinkedIn
                  </a>
                  <a href="#" className={`text-${activeDesign}-primary hover:opacity-80`}>
                    GitHub
                  </a>
                  <a href="#" className={`text-${activeDesign}-primary hover:opacity-80`}>
                    Twitter
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
