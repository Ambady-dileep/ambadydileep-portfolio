import {
  Braces,
  Code2,
  Database,
  FileCode2,
  Flame,
  GitBranch,
  Globe,
  Layers,
  Palette,
  Server,
  Terminal,
  Wrench,
  ShieldAlert,
  Cpu,
  Package,
} from 'lucide-react';
import { GitHubIcon } from './BrandIcons';

const map = {
  react: Layers,
  javascript: Braces,
  html: Globe,
  tailwind: Palette,
  python: Terminal,
  django: Server,
  api: Code2,
  node: Server,
  postgres: Database,
  mysql: Database,
  mongo: Database,
  git: GitBranch,
  github: GitHubIcon,
  vscode: FileCode2,
  postman: Flame,
  layout: Layers,
  server: Server,
  database: Database,
  wrench: Wrench,
  axios: Cpu,
  redux: Layers,
  jwt: ShieldAlert,
  npm: Package,
};

export function TechIcon({ name, className = 'w-5 h-5' }) {
  const Icon = map[name] || Code2;
  if (name === 'github') return <GitHubIcon className={className} />;
  return <Icon className={className} strokeWidth={1.5} />;
}