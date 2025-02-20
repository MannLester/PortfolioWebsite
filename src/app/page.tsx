'use client';

import { useState } from 'react';
import HomePage from '@/components/CreativeDesign/HomePage/HomePage';
import Navigation from '@/components/shared/Navigation';
import ProfessionalAboutPage from '@/components/ProfessionalDesign/AboutPage/AboutPage';
import SimpleAboutPage from '@/components/SimpleDesign/AboutPage/AboutPage';

export default function Home() {
  const [activeDesign, setActiveDesign] = useState<'creative' | 'professional' | 'simple'>('creative');

  return (
    <main className="min-h-screen pt-20">
      <Navigation activeDesign={activeDesign} onDesignChange={setActiveDesign} />
      <div className="container mx-auto px-4">
        <h1 className={`${activeDesign}-heading text-center mb-8`}>
          Welcome to My Portfolio
        </h1>
        <p className={`${activeDesign}-text text-center max-w-2xl mx-auto`}>
          Explore my work through three distinct design perspectives: Creative, Professional, and Simple.
          Each design showcases a different aspect of my capabilities as a developer.
        </p>
        {/* Design Content */}
        {activeDesign === 'creative' && (
          <HomePage />
        )}
        {activeDesign === 'professional' && <ProfessionalAboutPage />}
        {activeDesign === 'simple' && <SimpleAboutPage />}
      </div>
    </main>
  );
}
