'use client';

import { useState } from 'react';
import HomePage from '@/components/CreativeDesign/HomePage/HomePage';
import ProfessionalAboutPage from '@/components/ProfessionalDesign/AboutPage/AboutPage';
import SimpleAboutPage from '@/components/SimpleDesign/AboutPage/AboutPage';
import Navigation from '@/components/shared/Navigation';

export default function Home() {
  const [activeDesign, setActiveDesign] = useState<'creative' | 'professional' | 'simple'>('creative');
  const [isDark, setIsDark] = useState(false);

  const handleThemeToggle = () => {
    setIsDark(prev => !prev);
  };

  return (
    <main className="min-h-screen">
      <Navigation 
        activeDesign={activeDesign}
        onDesignChange={setActiveDesign}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
      />
      {activeDesign === 'creative' && (
        <HomePage 
          isDark={isDark}
          onThemeToggle={handleThemeToggle}
          activeDesign={activeDesign}
          onDesignChange={setActiveDesign}
        />
      )}
      {activeDesign === 'professional' && <ProfessionalAboutPage />}
      {activeDesign === 'simple' && <SimpleAboutPage />}
    </main>
  );
}
