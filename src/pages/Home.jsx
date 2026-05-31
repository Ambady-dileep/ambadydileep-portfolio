import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ScrollProgress } from "../components/layout/ScrollProgress";
import { PremiumBackground } from "../components/layout/PremiumBackground";
import { Hero } from "../components/sections/Hero";
import { FeaturedWork } from "../components/sections/FeaturedWork";
import { TechStack } from "../components/sections/TechStack";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { navLinks } from "../data/site";
import { useActiveSection } from "../hooks/useActiveSection";

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
        <TechStack />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}