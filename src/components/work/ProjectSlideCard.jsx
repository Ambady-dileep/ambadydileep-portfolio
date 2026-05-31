import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { GitHubIcon } from '../ui/BrandIcons';

export function ProjectSlideCard({ project, isActive }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border transition-all duration-500 w-full flex flex-col ${
        isActive
          ? 'border-[var(--border)] shadow-[var(--shadow-card)] bg-[var(--bg-muted)]/40 backdrop-blur-md'
          : 'border-[var(--border)]/60 shadow-[var(--shadow-soft)] bg-transparent'
      }`}
    >
      {/* ── Dynamic Layout Shell (No Fixed Aspect, No Black Frame) ── */}
      <div className="w-full relative overflow-hidden flex items-center justify-center">
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            // block w-full ensures the container scales naturally with the image height
            className="w-full h-auto block transition-transform duration-500 ease-out hover:scale-[1.01]"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full aspect-[16/10] flex flex-col items-center justify-center gap-2 px-6 relative z-10"
            style={{
              background: `linear-gradient(135deg, ${project.accent}18 0%, var(--bg-muted) 60%)`,
            }}
          >
            <span
              className="text-4xl font-semibold opacity-30"
              style={{ color: project.accent }}
            >
              {project.title.charAt(0)}
            </span>
            <p className="text-[11px] text-[var(--text-subtle)] font-light text-center">
              Add screenshot to <code className="text-[var(--text-muted)]">{project.image}</code>
            </p>
          </div>
        )}
      </div>

      {/* ── Content Area ── */}
      <div className="p-4 sm:p-5 flex-1 bg-[var(--bg-muted)]/10">
        <h3 className="text-base sm:text-lg font-semibold text-[var(--text)] tracking-[-0.02em] line-clamp-1">
          {project.title}
        </h3>
        <p className="mt-1 text-[12px] sm:text-[13px] text-[var(--text-muted)] font-light line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* ── Stack/Links Footer Bar ── */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 flex flex-wrap items-center gap-3 border-t border-[var(--border)]/60 bg-[var(--bg)]/50 mt-auto">
        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 text-[10px] sm:text-[11px] rounded-full font-medium border border-[var(--border)]/40 bg-[var(--bg-muted)]/60 text-[var(--text-muted)] whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-muted)] transition-all duration-200 focus-ring"
            >
              <GitHubIcon className="w-3 h-3" />
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-md border border-blue-500/20 bg-blue-500/5 text-blue-500 hover:bg-blue-500/10 transition-all duration-200 focus-ring"
            >
              <ExternalLink className="w-3 h-3" strokeWidth={2} />
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}