"use client";

import { Anton } from 'next/font/google';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import brickBackground from '@/assets/images/home_page/brick_bg.jpg';
import emailjs from '@emailjs/browser';
import { FormEvent, useRef, useState } from 'react';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
});

const ContactPage = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!form.current) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        'service_5iz9rug', // Replace with your EmailJS service ID
        'template_qkwe5td', // Replace with your EmailJS template ID
        form.current,
        'y4HBxB8Dlt4vhA0xw' // Replace with your EmailJS public key
      );
      setSubmitStatus('success');
      form.current.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col relative" style={{ backgroundImage: `url(${brickBackground.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-50" />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
            {/* Left Side - Title and Connect Info */}
            <div className="flex-1 md:pr-12 md:mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className={`${anton.className} mb-3 text-foreground`}>
                  <span className="text-4xl tracking-normal font-bold">Let&apos;s</span>{" "}
                  <br />
                  <motion.span
                    className="text-8xl tracking-normal [text-shadow:unset]"
                    initial={{ opacity: 1, color: "#000000" }}
                    animate={{
                      color: ["#000000", "#fff", "#fff", "#fff", "#fff", "#fff", "#000000", "#fff"],
                      textShadow: [
                        "unset",
                        "0 0 7px #3366ff, 0 0 10px #3366ff, 0 0 21px #3366ff, 0 0 42px #3366ff",
                        "0 0 4px #3366ff, 0 0 8px #3366ff, 0 0 16px #3366ff, 0 0 32px #3366ff",
                        "0 0 7px #3366ff, 0 0 10px #3366ff, 0 0 21px #3366ff, 0 0 42px #3366ff",
                        "0 0 4px #3366ff, 0 0 8px #3366ff, 0 0 16px #3366ff, 0 0 32px #3366ff",
                        "0 0 7px #3366ff, 0 0 10px #3366ff, 0 0 21px #3366ff, 0 0 42px #3366ff",
                        "unset",
                        "0 0 7px #3366ff, 0 0 10px #3366ff, 0 0 21px #3366ff, 0 0 42px #3366ff"
                      ],
                      x: [0, 0.5, -0.5, 0.25, -0.25, 0, 0, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      times: [0, 0.1, 0.2, 0.4, 0.6, 0.7, 0.8, 1],
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                  >
                    Connect!
                  </motion.span>
                </h2>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-primary/20 [box-shadow:0_0_7px_#3366ff,0_0_10px_#3366ff]"
              >
                <h3 className={`${anton.className} text-xl mb-6 text-foreground`}>Connect with me</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <FaEnvelope className="text-2xl text-primary" />
                    <div>
                      <h4 className="text-foreground font-semibold">Email</h4>
                      <a href="mailto:mannlesterm@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        mannlesterm@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <FaLinkedin className="text-2xl text-primary" />
                    <div>
                      <h4 className="text-foreground font-semibold">LinkedIn</h4>
                      <a href="https://linkedin.com/in/mann-lester-magbuhos-182ba1281" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        linkedin.com/in/mann-lester-magbuhos-182ba1281
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <FaGithub className="text-2xl text-primary" />
                    <div>
                      <h4 className="text-foreground font-semibold">GitHub</h4>
                      <a href="https://github.com/MannLester" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        github.com/MannLester
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
              className="flex-1 bg-black/40 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-primary/20 [box-shadow:0_0_7px_#3366ff,0_0_10px_#3366ff] md:mt-16 md:ml-8"
            >
              <h3 className={`${anton.className} text-xl mb-6 text-foreground`}>Send me a message</h3>
              <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Your Name"
                    required
                    className="w-full p-3 rounded bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="from_email"
                    placeholder="Your Email"
                    required
                    className="w-full p-3 rounded bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={5}
                    className="w-full p-3 rounded bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary text-primary-foreground py-3 rounded hover:bg-primary/90 transition-colors relative ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-500 text-center">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
                )}
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