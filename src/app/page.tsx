import HomePage from '@/components/sections/HomePage';
import AboutPage from '@/components/sections/AboutPage';
import SkillsPage from '@/components/sections/SkillsPage';
import ProjectPage from '@/components/sections/ProjectPage';
import RecognitionPage from '@/components/sections/RecognitionPage';
import ExperiencePage from '@/components/sections/ExperiencePage';
import ContactPage from '@/components/sections/ContactPage';

export default function Home() {
  return (
    <>
      <HomePage />
      <AboutPage />
      <SkillsPage />
      <ProjectPage />
      <ExperiencePage />
      <RecognitionPage />
      <ContactPage />
    </>
  );
}