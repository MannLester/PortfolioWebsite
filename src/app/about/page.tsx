'use client';

import { useState } from 'react';
import Navigation from '@/components/shared/Navigation';
import CreativeAboutPage from '@/components/CreativeDesign/AboutPage/AboutPage';
import ProfessionalAboutPage from '@/components/ProfessionalDesign/AboutPage/AboutPage';
import SimpleAboutPage from '@/components/SimpleDesign/AboutPage/AboutPage';

export default function About() {
  const [activeDesign, setActiveDesign] = useState<'creative' | 'professional' | 'simple'>('creative');

  return (
    <>
      <Navigation activeDesign={activeDesign} onDesignChange={setActiveDesign} />
      <main className="min-h-screen pt-20">
        {activeDesign === 'creative' && <CreativeAboutPage />}
        {activeDesign === 'professional' && <ProfessionalAboutPage />}
        {activeDesign === 'simple' && <SimpleAboutPage />}
      </main>
    </>
  );
}
