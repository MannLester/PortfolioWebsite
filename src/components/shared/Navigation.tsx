'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeDesign: 'creative' | 'professional' | 'simple';
  onDesignChange: (design: 'creative' | 'professional' | 'simple') => void;
}

const Navigation = ({ activeDesign, onDesignChange }: NavigationProps) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        {/* Main Navigation */}
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3 py-2 transition-colors ${
                pathname === item.href
                  ? `text-${activeDesign}-primary font-medium`
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {pathname === item.href && (
                <motion.div
                  layoutId="underline"
                  className={`absolute left-0 right-0 bottom-0 h-0.5 bg-${activeDesign}-primary`}
                />
              )}
              {item.label}
            </Link>
          ))}
        </div>

        {/* Design Switcher */}
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-lg shadow-lg p-2 flex gap-2">
          <button
            onClick={() => onDesignChange('creative')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeDesign === 'creative'
                ? 'bg-creative-primary text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Creative
          </button>
          <button
            onClick={() => onDesignChange('professional')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeDesign === 'professional'
                ? 'bg-professional-primary text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Professional
          </button>
          <button
            onClick={() => onDesignChange('simple')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeDesign === 'simple'
                ? 'bg-simple-primary text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Simple
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
