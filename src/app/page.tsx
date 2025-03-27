import HomePage from '@/components/sections/HomePage';
import AboutPage from '@/components/sections/AboutPage';
import SkillsPage from '@/components/sections/SkillsPage';
import ProjectPageHome from '@/components/sections/ProjectPage-Home';

export default function Home() {
  return (
    <>
      <HomePage />
      <AboutPage />
      <SkillsPage />
      {/* <ProjectPageHome /> */}
    </>
  );
}