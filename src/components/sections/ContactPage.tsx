"use client";

import { Anton } from 'next/font/google';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import brickBackground from '@/assets/images/home_page/brick_bg.jpg';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
});

const ContactPage = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col relative" style={{ backgroundImage: `url(${brickBackground.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-50" />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
            {/* Left Side - Title and Connect Info */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className={`${anton.className} text-5xl mb-3 text-foreground`}>
                  Let&apos;s <span className="text-primary [text-shadow:0_0_7px_#9933ff,0_0_10px_#9933ff,0_0_21px_#9933ff]">Connect</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  I&apos;m always open to new opportunities and collaborations. Feel free to reach out!
                </p>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-primary/20"
              >
                <h3 className={`${anton.className} text-xl mb-6 text-foreground`}>Connect with me</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <FaEnvelope className="text-2xl text-primary" />
                    <div>
                      <h4 className="text-foreground font-semibold">Email</h4>
                      <a href="mailto:your.email@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                        your.email@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <FaLinkedin className="text-2xl text-primary" />
                    <div>
                      <h4 className="text-foreground font-semibold">LinkedIn</h4>
                      <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        linkedin.com/in/yourusername
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <FaGithub className="text-2xl text-primary" />
                    <div>
                      <h4 className="text-foreground font-semibold">GitHub</h4>
                      <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        github.com/yourusername
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1 bg-black/40 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-primary/20"
            >
              <h3 className={`${anton.className} text-xl mb-6 text-foreground`}>Send me a message</h3>
              <form className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 rounded bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 rounded bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    className="w-full p-3 rounded bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 relative z-10 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Mann Lester Magbuhos. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactPage;