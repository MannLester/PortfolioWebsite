"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MobileNav } from '../Navigation/MobileNav';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const Header = () => {
  return (
    <motion.header 
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          ML
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#projects" className="hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="#skills" className="hover:text-primary transition-colors">
            Skills
          </Link>
          <Link href="#experience" className="hover:text-primary transition-colors">
            Experience
          </Link>
          <Link href="#recognitions" className="hover:text-primary transition-colors">
            Recognitions
          </Link>
          <Link href="#contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
          <ThemeToggle />
        </nav>

        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
};

export { Header };
