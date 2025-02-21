'use client';

import { useState } from 'react';
import HomePage from '@/components/CreativeDesign/HomePage/HomePage';
import ProfessionalAboutPage from '@/components/ProfessionalDesign/AboutPage/AboutPage';
import SimpleAboutPage from '@/components/SimpleDesign/AboutPage/AboutPage';

export default function Home() {
  const [activeDesign, setActiveDesign] = useState<'creative' | 'professional' | 'simple'>('creative');

  return (
    <main className="min-h-screen">
      {activeDesign === 'creative' && (
        <HomePage />
      )}
      {activeDesign === 'professional' && <ProfessionalAboutPage />}
      {activeDesign === 'simple' && <SimpleAboutPage />}
    </main>
  );
}
