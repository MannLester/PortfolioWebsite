"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const menuVariants = {
    closed: {
      x: "100vw",
      transition: {
        duration: 0.2
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-foreground"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          {isOpen ? (
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999999] overflow-y-auto cursor-pointer"
              onClick={() => setIsOpen(false)}
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
            />
            <motion.nav
              className="fixed top-0 right-0 w-3/4 h-[100vh] bg-background shadow-xl p-6 z-[999999999]"
              onClick={(e) => e.stopPropagation()}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="flex flex-col space-y-6 relative pt-4">
                <Link 
                  href="#about" 
                  className="text-lg hover:text-primary transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="#projects" 
                  className="text-lg hover:text-primary transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </Link>
                <Link 
                  href="#skills" 
                  className="text-lg hover:text-primary transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Skills
                </Link>
                <Link 
                  href="#experience" 
                  className="text-lg hover:text-primary transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Experience
                </Link>
                <Link 
                  href="#recognitions" 
                  className="text-lg hover:text-primary transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Recognitions
                </Link>
                <Link 
                  href="#contact" 
                  className="text-lg hover:text-primary transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.nav>
          </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export { MobileNav };
