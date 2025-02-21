'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import sunIcon from '@/assets/CreativeDesign/buttons/sun_icon.png';
import moonIcon from '@/assets/CreativeDesign/buttons/moon_icon.png';

interface NavigationProps {
  activeDesign: 'creative' | 'professional' | 'simple';
  onDesignChange: (design: 'creative' | 'professional' | 'simple') => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

const Navigation = ({ activeDesign, onDesignChange, isDark, onThemeToggle }: NavigationProps) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      isDark ? 'bg-gray-900/95' : 'bg-gray-800/95'
    } backdrop-blur-sm`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Main Navigation */}
        <div className="flex items-center space-x-8">
          {/* Logo Placeholder */}
          <div className="w-12 h-12 bg-creative-primary rounded-lg flex items-center justify-center font-bold text-white" style={{ imageRendering: 'pixelated' }}>
            ML
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 transition-colors font-['Press_Start_2P'] text-sm ${
                  pathname === item.href
                    ? 'text-creative-primary'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{ imageRendering: 'pixelated' }}
              >
                {pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-creative-primary"
                    style={{ imageRendering: 'pixelated' }}
                  />
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Design Switcher */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-1.5 flex gap-1.5">
            {['Creative', 'Professional', 'Simple'].map((design) => (
              <button
                key={design}
                onClick={() => onDesignChange(design.toLowerCase() as any)}
                className={`px-3 py-1.5 rounded-md transition-all text-sm ${
                  activeDesign === design.toLowerCase()
                    ? 'bg-creative-primary text-white'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
                style={{ imageRendering: 'pixelated' }}
              >
                {design}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={onThemeToggle}
            className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ imageRendering: 'pixelated' }}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <motion.div 
              className="w-6 h-6 relative"
              initial={false}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={isDark ? sunIcon : moonIcon}
                alt={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                fill
                className="object-contain"
                style={{ imageRendering: 'pixelated' }}
                priority
              />
            </motion.div>
          </motion.button>

          {/* Alien Asset Placeholder */}
          <div className="w-10 h-10 bg-green-500 rounded-lg" style={{ imageRendering: 'pixelated' }} />
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
