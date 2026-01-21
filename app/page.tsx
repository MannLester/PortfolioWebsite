"use client";

import { HeroSection } from '@/app/components/sections/HeroSection';
import { AboutSection } from '@/app/components/sections/AboutSection';
import { SkillsSection } from '@/app/components/sections/SkillsSection';
import { ProjectsSection } from '@/app/components/sections/ProjectsSection';
import { ExperienceSection } from '@/app/components/sections/ExperienceSection';
import { ContactSection } from '@/app/components/sections/ContactSection';
import { AffiliationSection } from './components/sections/AffiliationSection';
import { RecognitionSection } from './components/sections/RecognitionSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <AffiliationSection />
      <ProjectsSection />
      <SkillsSection /> 
      <ExperienceSection />
      <RecognitionSection />
      <ContactSection />
    </div>
  );
}
