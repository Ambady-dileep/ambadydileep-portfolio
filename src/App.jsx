import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { useTheme } from './hooks/useTheme';
import { useLenis } from './hooks/useLenis';
import { siteConfig } from './data/site';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  const { isDark, toggleTheme } = useTheme();
  useLenis();

  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" />
        <title>{siteConfig.name} | Full-Stack Developer</title>
        <meta name="description" content={siteConfig.headline} />
        <link rel="canonical" href={siteConfig.domain} />
      </Helmet>

      <div className="background-animation">
        <BackgroundAnimation isDark={isDark} />
      </div>

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
