import { useState, useEffect } from 'react';
import PixelSnow from './PixelSnow';

export default function BackgroundAnimation({ isDark }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Theme-based colors
  const darkColor = '#e2e8f0'; // Subtle light gray for dark mode
  const lightColor = '#64748b'; // Darker slate for light mode visibility
  const color = isDark ? darkColor : lightColor;

  // Desktop settings (subtle, professional)
  const desktopProps = {
    color,
    flakeSize: 0.008,
    minFlakeSize: 1,
    pixelResolution: 250,
    speed: 0.6,
    density: 0.12,
    brightness: 0.7,
    direction: 125,
    variant: 'round'
  };

  // Mobile settings (lower density for performance)
  const mobileProps = {
    color,
    flakeSize: 0.008,
    minFlakeSize: 1,
    pixelResolution: 180,
    speed: 0.5,
    density: 0.06,
    brightness: 0.7,
    direction: 125,
    variant: 'round'
  };

  const props = isMobile ? mobileProps : desktopProps;

  return <PixelSnow {...props} />;
}
