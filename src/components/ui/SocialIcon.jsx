import { Code2 } from 'lucide-react';
import { GitHubIcon, InstagramIcon, LeetCodeIcon, LinkedInIcon } from './BrandIcons';

const icons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  code: LeetCodeIcon,
};

export function SocialIcon({ icon, className = 'w-5 h-5' }) {
  const Icon = icons[icon] || Code2;
  return <Icon className={className} aria-hidden />;
}
