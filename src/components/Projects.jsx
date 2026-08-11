// src/components/Projects.jsx
import { resume } from "../data/resume";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Projects() {
  const [lightbox, setLightbox] = useState(null); // { project, projectIndex, imageIndex }

  // Prevent body scroll when lightbox open
  useEffect(() => {
    if (lightbox) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = original);
    }
  }, [lightbox]);

  // Keyboard handlers (ESC, arrows)
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const openLightbox = (project, projectIndex, imageIndex) => {
    setLightbox({ project, projectIndex, imageIndex });
  };

  const closeLightbox = () => setLightbox(null);

  const nextImage = () => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const { project } = lb;
      const next = (lb.imageIndex + 1) % project.images.length;
      return { ...lb, imageIndex: next };
    });
  };
  const prevImage = () => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const { project } = lb;
      const prev =
        (lb.imageIndex - 1 + project.images.length) % project.images.length;
      return { ...lb, imageIndex: prev };
    });
  };

  return (
    <section className="relative py-24" aria-label="Selected projects">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Selected work"
            title="Projects"
            description="Systems I've built for real organizations — what the problem was, what I did, and what it runs on."
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {resume.projects.map((project, idx) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={idx}
              onOpenLightbox={(imageIndex) =>
                openLightbox(project, idx, imageIndex)
              }
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            aria-modal="true"
            role="dialog"
            aria-label={`Screenshot of ${lightbox.project.name}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-5xl w-full"
            >
              <div className="relative overflow-hidden rounded-xl border border-white/15 bg-surface-raised shadow-2xl">
                <img
                  src={lightbox.project.images[lightbox.imageIndex]}
                  alt={lightbox.project.name + " enlarged screenshot"}
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  className="w-full h-auto max-h-[75vh] object-contain select-none"
                  draggable={false}
                />
                {lightbox.project.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white/90 transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
                      aria-label="Previous image"
                    >
                      ◀
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white/90 transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
                      aria-label="Next image"
                    >
                      ▶
                    </button>
                  </>
                )}
                {lightbox.project.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                    {lightbox.project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightbox((lb) =>
                            lb ? { ...lb, imageIndex: i } : lb,
                          );
                        }}
                        className={`h-2.5 w-5 rounded-full transition ${
                          i === lightbox.imageIndex
                            ? "bg-accent-400"
                            : "bg-white/25 hover:bg-white/40"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                        aria-current={
                          i === lightbox.imageIndex ? "true" : undefined
                        }
                      />
                    ))}
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  className="absolute top-3 right-3 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
                  aria-label="Close"
                >
                  Close ✕
                </button>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4 px-1">
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {lightbox.project.name}
                  </h4>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-zinc-500">
                    {lightbox.imageIndex + 1} / {lightbox.project.images.length}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onOpenLightbox }) {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = project.images.length > 0;
  const multi = hasImages && project.images.length > 1;
  const next = () =>
    hasImages && setActiveIndex((i) => (i + 1) % project.images.length);
  const prev = () =>
    hasImages &&
    setActiveIndex(
      (i) => (i - 1 + project.images.length) % project.images.length,
    );
  return (
    <Reveal delay={index * 0.05} className="h-full">
      <article className="card card-hover flex h-full flex-col overflow-hidden">
        <div className="relative border-b border-white/10 bg-surface-raised">
          {hasImages ? (
            <button
              type="button"
              onClick={() => onOpenLightbox(activeIndex)}
              className="block aspect-[16/10] w-full cursor-zoom-in overflow-hidden"
              aria-label={`Open enlarged screenshots of ${project.name}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={project.images[activeIndex]}
                  src={project.images[activeIndex]}
                  alt={`${project.name} — screenshot ${activeIndex + 1} of ${project.images.length}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchpriority={index === 0 ? "high" : "low"}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="h-full w-full object-cover object-top"
                  draggable={false}
                />
              </AnimatePresence>
            </button>
          ) : (
            <div className="flex aspect-[16/10] w-full items-center justify-center bg-white/[0.04]">
              <p className="text-sm text-zinc-500">Screenshot coming soon</p>
            </div>
          )}
          {multi && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-xs text-white/90 hover:bg-black/80"
                aria-label="Previous screenshot"
              >
                ◀
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-xs text-white/90 hover:bg-black/80"
                aria-label="Next screenshot"
              >
                ▶
              </button>
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                {project.images.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 w-2 rounded-full transition ${
                      i === activeIndex
                        ? "bg-accent-400"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Show screenshot ${i + 1}`}
                    aria-current={i === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold text-white">
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent-300 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                >
                  {project.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 text-zinc-500"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : (
                project.name
              )}
            </h3>
            <p className="font-mono text-xs text-zinc-500">{project.period}</p>
          </div>
          {project.role && (
            <p className="mt-1 text-sm font-medium text-accent-300">
              {project.role}
            </p>
          )}
          {project.problem && (
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              <span className="font-semibold text-zinc-300">Problem: </span>
              {project.problem}
            </p>
          )}
          {project.description && (
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {project.description}
            </p>
          )}
          {project.highlights && (
            <ul className="mt-3 space-y-1.5">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-zinc-300"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                    aria-hidden="true"
                  />
                  {h}
                </li>
              ))}
            </ul>
          )}
          <ul
            className="mt-auto flex flex-wrap gap-2 pt-4"
            aria-label="Technology stack"
          >
            {project.tech.map((tech) => (
              <li key={tech} className="badge">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}
