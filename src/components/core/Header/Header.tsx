"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MobileNav } from '../Navigation/MobileNav';
import { useModal } from '@/context/ModalContext';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { setIsModalOpen } = useModal();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleNavClick = () => {
    setIsModalOpen(false);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 w-full z-[9999] bg-background/95 backdrop-blur-md border-b overflow-x-hidden shadow-md sticky-header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%' }}
    >
      <div className="w-[100vw] h-16 flex items-center justify-between px-8 sm:px-16">
        <Link href={isHomePage ? "#home" : "/#home"} className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          ML
        </Link>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-8">
            <Link href={isHomePage ? "#home" : "/#home"} className="hover:text-primary transition-colors" onClick={handleNavClick}>
              Home
            </Link>
            <Link href={isHomePage ? "#about" : "/#about"} className="hover:text-primary transition-colors" onClick={handleNavClick}>
              About
            </Link>
            <Link href={isHomePage ? "#skills" : "/#skills"} className="hover:text-primary transition-colors" onClick={handleNavClick}>
              Skills
            </Link>
            <Link href={isHomePage ? "#projects" : "/#projects"} className="hover:text-primary transition-colors" onClick={handleNavClick}>
              Projects
            </Link>
            <Link href={isHomePage ? "#experience" : "/#experience"} className="hover:text-primary transition-colors" onClick={handleNavClick}>
              Experience
            </Link>
            <Link href={isHomePage ? "#recognitions" : "/#recognitions"} className="hover:text-primary transition-colors" onClick={handleNavClick}>
              Recognitions
            </Link>
            <Link href={isHomePage ? "#contact" : "/#contact"} className="hover:text-primary transition-colors" onClick={handleNavClick}>
              Contact
            </Link>
          </nav>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
};

export { Header };
