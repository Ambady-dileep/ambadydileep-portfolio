import {
  siPython,
  siJavascript,
  siReact,
  siHtml5,
  siCss,
  siDjango,
  siNodedotjs,
  siPostgresql,
  siMysql,
  siMongodb,
  siGit,
  siGithub,
  siTailwindcss,
  siPostman,
  siVite,
  siSqlalchemy,
  siFramer,
} from 'simple-icons';

const icons = {
  python: siPython,
  javascript: siJavascript,
  react: siReact,
  html5: siHtml5,
  css: siCss,
  django: siDjango,
  nodedotjs: siNodedotjs,
  postgresql: siPostgresql,
  mysql: siMysql,
  mongodb: siMongodb,
  git: siGit,
  github: siGithub,
  tailwindcss: siTailwindcss,
  postman: siPostman,
  vite: siVite,
  sqlalchemy: siSqlalchemy,
  framer: siFramer,
};

function VscodeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#007ACC"
        d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.192 8.313L6.78 6.795a1.012 1.012 0 0 0-1.42.015L4.42 7.753a1.012 1.012 0 0 0 .015 1.42l2.585 2.585-2.585 2.585a1.012 1.012 0 0 0-.015 1.42l1.94 1.943a1.012 1.012 0 0 0 1.42-.015l2.533-2.518 8.313 9.192a1.494 1.494 0 0 0 1.705.29l4.94-2.377A1.496 1.496 0 0 0 24 20.06V3.939a1.496 1.496 0 0 0-.85-1.352zm-5.146 14.861L10.826 13l7.178-7.178 2.378 1.142-5.77 11.724z"
      />
    </svg>
  );
}

export function getBrandHex(slug) {
  if (slug === 'vscode') return '007ACC';
  return icons[slug]?.hex ?? '2563EB';
}

export function TechBrandIcon({ slug, className = 'w-4 h-4' }) {
  if (slug === 'vscode') {
    return <VscodeIcon className={className} />;
  }

  const icon = icons[slug];
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
