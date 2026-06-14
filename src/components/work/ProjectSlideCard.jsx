import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { GitHubIcon } from '../ui/BrandIcons';

export function ProjectSlideCard({ project, isActive }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border w-full flex flex-col project-slide-card ${
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
            alt={`${project.title} — Web Development Project by Freelance Web Developer Ambady Dileep`}
            width="1900"
            height="963"
            className="w-full h-auto block project-card-image"
            style={{ aspectRatio: '1900/963' }}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full aspect-[1900/963] flex flex-col items-center justify-center gap-2 px-6 relative z-10"
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
      {/* Structural layout changes applied directly below to prevent dynamic misalignment */}
      <div className="px-4 sm:px-5 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--border)]/60 bg-[var(--bg)]/50 mt-auto">
        
        {/* Tech Stack Sub-Grid Wrapper */}
        <div className="flex flex-wrap gap-1.5 w-full sm:flex-1 min-w-0">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 text-[10px] sm:text-[11px] rounded-full font-medium border border-[var(--border)]/40 bg-[var(--bg-muted)]/60 text-[var(--text-muted)] whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
        
        {/* Clean Link Action Block */}
        <div className="flex gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t border-[var(--border)]/20 sm:border-0 justify-end">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 flex-1 sm:flex-none px-3 py-1.5 sm:py-1 text-[11px] font-medium rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-muted)] transition-all duration-200 focus-ring"
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
              className="inline-flex items-center justify-center gap-1.5 flex-1 sm:flex-none px-3 py-1.5 sm:py-1 text-[11px] font-medium rounded-md border border-blue-500/20 bg-blue-500/5 text-blue-500 hover:bg-blue-500/10 transition-all duration-200 focus-ring"
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
