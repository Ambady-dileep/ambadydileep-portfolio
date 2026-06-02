import { Suspense, lazy } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ScrollProgress } from "../components/layout/ScrollProgress";
import { PremiumBackground } from "../components/layout/PremiumBackground";
import { Hero } from "../components/sections/Hero";
import { FeaturedWork } from "../components/sections/FeaturedWork";
import { About } from "../components/sections/About";
import { navLinks } from "../data/site";
import { useActiveSection } from "../hooks/useActiveSection";

const TechStack = lazy(() =>
  import("../components/sections/TechStack").then((module) => ({ default: module.TechStack }))
);
const Contact = lazy(() =>
  import("../components/sections/Contact").then((module) => ({ default: module.Contact }))
);

const TechStackFallback = () => <div style={{ minHeight: '600px' }} className="w-full relative" />;
const ContactFallback = () => <div style={{ minHeight: '700px' }} className="w-full relative" />;

export function Home({ isDark, onToggleTheme }) {
  const sectionIds = navLinks.map((l) => l.id);
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <PremiumBackground />
      <ScrollProgress />
      <Navbar
        activeId={activeId}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />
      <main>
        <Hero isDark={isDark} />
        <FeaturedWork />
        <Suspense fallback={<TechStackFallback />}>
          <TechStack />
        </Suspense>
        <About />
        <Suspense fallback={<ContactFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}