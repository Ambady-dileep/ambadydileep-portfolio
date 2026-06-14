import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { useTheme } from './hooks/useTheme';
import { useLenis } from './hooks/useLenis';
import { siteConfig } from './data/site';
import { PremiumBackground } from './components/layout/PremiumBackground';

function App() {
  const { isDark, toggleTheme } = useTheme();
  useLenis();

  useEffect(() => {
    document.dispatchEvent(new CustomEvent('app-ready'));
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" />
        <title>Ambady Dileep | Freelance Web Developer & Frontend Engineer</title>
        <meta name="description" content="Ambady Dileep is an expert freelance web developer and frontend developer based in Kerala, India. Hire a professional website developer for your custom apps." />
        <link rel="canonical" href={siteConfig.domain} />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.domain} />
        <meta property="og:title" content="Ambady Dileep | Freelance Web Developer & Frontend Engineer" />
        <meta property="og:description" content="Ambady Dileep is an expert freelance web developer and frontend developer based in Kerala, India. Hire a professional website developer for your custom apps." />
        <meta property="og:image" content={`${siteConfig.domain}/portfolio.webp`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteConfig.domain} />
        <meta name="twitter:title" content="Ambady Dileep | Freelance Web Developer & Frontend Engineer" />
        <meta name="twitter:description" content="Ambady Dileep is an expert freelance web developer and frontend developer based in Kerala, India. Hire a professional website developer for your custom apps." />
        <meta name="twitter:image" content={`${siteConfig.domain}/portfolio.webp`} />
      </Helmet>

      <PremiumBackground />

      <div className="main-content-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home isDark={isDark} onToggleTheme={toggleTheme} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
