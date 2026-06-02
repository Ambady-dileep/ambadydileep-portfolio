// 1. Import locally available SVG files from src/assets/ as raw strings
import djangoSvg from '../../assets/django.svg?raw';
import gitSvg from '../../assets/git.svg?raw';
import githubSvg from '../../assets/github.svg?raw';
import html5Svg from '../../assets/html5.svg?raw';
import javascriptSvg from '../../assets/javascript.svg?raw';
import postgresqlSvg from '../../assets/postgresql.svg?raw';
import pythonSvg from '../../assets/python.svg?raw';
import reactSvg from '../../assets/react.svg?raw';
import vscodeSvg from '../../assets/vscode.svg?raw';
// New Local Assets
import axiosSvg from '../../assets/Axios.svg?raw';
import reduxSvg from '../../assets/redux.svg?raw';
import jwtSvg from '../../assets/jwt.svg?raw';
import npmSvg from '../../assets/NPM.svg?raw';

// 2. Import simple-icons for the remaining fallback technologies
import {
  siCss,
  siFramer,
  siMongodb,
  siMysql,
  siNodedotjs,
  siPostman,
  siSqlalchemy,
  siTailwindcss,
  siVite,
} from 'simple-icons';

// Mapping table for local SVG files
const localSvgs = {
  django: djangoSvg,
  git: gitSvg,
  github: githubSvg,
  html5: html5Svg,
  javascript: javascriptSvg,
  postgresql: postgresqlSvg,
  python: pythonSvg,
  react: reactSvg,
  vscode: vscodeSvg,
  axios: axiosSvg,
  redux: reduxSvg,
  jwt: jwtSvg,
  npm: npmSvg,
};

// Brand color values for custom local SVGs to preserve orbit glow/hover effects
const localBrandHexes = {
  django: '092E20',
  git: 'F05032',
  github: '181717',
  html5: 'E34F26',
  javascript: 'F7DF1E',
  postgresql: '4169E1',
  python: '3776AB',
  react: '61DAFB',
  vscode: '007ACC',
  axios: '5A29E4',
  redux: '764ABC',
  jwt: 'FB015B',
  npm: 'CB3837',
};

// Mapping table for simple-icons assets
const simpleIcons = {
  css: siCss,
  framer: siFramer,
  mongodb: siMongodb,
  mysql: siMysql,
  nodedotjs: siNodedotjs,
  postman: siPostman,
  sqlalchemy: siSqlalchemy,
  tailwindcss: siTailwindcss,
  vite: siVite,
};

export function getBrandHex(slug) {
  return localBrandHexes[slug] ?? simpleIcons[slug]?.hex ?? '2563EB';
}

export function TechBrandIcon({ slug, className = 'w-4 h-4' }) {
  // Strategy A: Safely inject local SVG string if available
  if (localSvgs[slug]) {
    return (
      <span
        className={`inline-flex items-center justify-center ${className}`}
        dangerouslySetInnerHTML={{ __html: localSvgs[slug] }}
        aria-hidden="true"
      />
    );
  }

  // Strategy B: Fall back cleanly to official Simple Icons paths
  const icon = simpleIcons[slug];
  if (!icon) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={icon.title}
    >
      <path fill={`#${icon.hex}`} d={icon.path} />
    </svg>
  );
}