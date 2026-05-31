import { socialLinks } from '../../data/site';
import { SocialIcon } from '../ui/SocialIcon';

export function Footer() {
  return (
    <footer className="py-8 border-t border-[var(--border)]">
      <div className="section-container flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-[var(--border)] text-[11px] font-normal text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[#2563EB]/20 hover:shadow-[0_2px_12px_rgba(37,99,235,0.08)] transition-all duration-300 focus-ring"
            >
              <SocialIcon icon={link.icon} className="w-3 h-3" />
              {link.name}
            </a>
          ))}
        </div>
        <p className="text-center text-[12px] font-light text-[var(--text-subtle)] tracking-[-0.01em]">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://instagram.com/ambady.dileep"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block font-medium group
                      bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                      bg-clip-text text-transparent"
          >
            ambady.dileep

            {/* underline sweep */}
            <span className="absolute left-0 -bottom-[2px] h-[1px] w-full overflow-hidden">
              <span
                className="block h-full w-full
                          bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                          scale-x-0 origin-left transition-transform duration-300 ease-out
                          group-hover:scale-x-100"
              />
            </span>
          </a>
        </p>
      </div>
    </footer>
  );
}
