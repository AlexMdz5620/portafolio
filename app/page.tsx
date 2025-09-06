import ProjectsSection from '@/components/ProjectsSection';
import TechSection from '@/components/TechSection';
import WelcomeSection from '@/components/WelcomeSection';

export default function Home() {
  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <WelcomeSection />
        <ProjectsSection />
        <TechSection />
      </main>
    </div>
  );
}
