// src/components/Projects.jsx
import { resume } from "../data/resume";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
// Workaround to satisfy linter that motion is used
// (motion.<tag> usage sometimes not detected by strict unused-vars rule)
const __motionRef = motion;

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
    <section className="relative py-24" id="projects">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-14 text-center bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]"
        >
          Magical Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
                mass: 0.7,
              }}
              className="relative max-w-5xl w-full"
            >
              <div className="relative overflow-hidden rounded-2xl border border-purple-400/30 bg-gradient-to-br from-white/10 via-white/5 to-white/10 shadow-2xl">
                <img
                  src={lightbox.project.images[lightbox.imageIndex]}
                  alt={lightbox.project.name + " enlarged screenshot"}
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
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white/80 p-3 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 transition"
                      aria-label="Previous image"
                    >
                      ◀
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white/80 p-3 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 transition"
                      aria-label="Next image"
                    >
                      ▶
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {lightbox.project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightbox((lb) =>
                          lb ? { ...lb, imageIndex: i } : lb
                        );
                      }}
                      className={`h-2.5 w-5 rounded-full transition ${
                        i === lightbox.imageIndex
                          ? "bg-pink-400"
                          : "bg-white/25 hover:bg-white/40"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  className="absolute top-3 right-3 rounded-full bg-black/50 hover:bg-black/70 text-white/80 px-4 py-2 text-sm font-semibold backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
                  aria-label="Close"
                >
                  Close ✕
                </button>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4 px-1">
                <div>
                  <h4 className="text-lg font-semibold text-pink-200 tracking-wide drop-shadow">
                    {lightbox.project.name}
                  </h4>
                  <p className="mt-1 text-xs uppercase tracking-wider text-purple-200/70">
                    {lightbox.imageIndex + 1} / {lightbox.project.images.length}
                  </p>
                </div>
                <button
                  onClick={closeLightbox}
                  className="rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-semibold text-purple-100 tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onOpenLightbox }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const next = () => setActiveIndex((i) => (i + 1) % project.images.length);
  const prev = () =>
    setActiveIndex(
      (i) => (i - 1 + project.images.length) % project.images.length
    );
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay: index * 0.15 }}
      className="group relative flex flex-col rounded-2xl border border-purple-500/30 bg-white/5 p-5 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-pink-400/50 hover:shadow-pink-500/30"
    >
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.25),transparent_70%)]" />
        <button
          type="button"
          onClick={() => onOpenLightbox(activeIndex)}
          className="block aspect-[4/3] w-full overflow-hidden cursor-zoom-in"
          aria-label={`Open enlarged view of ${project.name}`}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={project.images[activeIndex]}
              src={project.images[activeIndex]}
              alt={project.name + " screenshot"}
              initial={{ opacity: 0, scale: 1.04, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full w-full object-cover object-center rounded-lg shadow-md shadow-purple-900/40"
              draggable={false}
            />
          </AnimatePresence>
        </button>
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-xs text-purple-100 backdrop-blur hover:bg-black/60"
          aria-label="Previous screenshot"
        >
          ◀
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-xs text-purple-100 backdrop-blur hover:bg-black/60"
          aria-label="Next screenshot"
        >
          ▶
        </button>
        <div className="mt-2 flex items-center justify-center gap-2 mb-2">
          {project.images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === activeIndex
                  ? "bg-pink-400 ring-2 ring-purple-400 ring-offset-2 ring-offset-[#0b0b12]"
                  : "bg-purple-600/40 hover:bg-pink-300/70"
              }`}
              aria-label={`Show image ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-pink-300 drop-shadow-[0_0_6px_rgba(244,114,182,0.45)]">
        {project.name}
      </h3>
      <p className="mt-1 text-sm text-purple-200/80">{project.period}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-purple-100/90">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="group/tech relative cursor-default rounded-full border border-purple-500/40 bg-gradient-to-br from-purple-700/40 via-purple-800/30 to-fuchsia-800/40 px-3 py-1 text-[11px] font-medium tracking-wide text-purple-100 shadow-inner shadow-purple-900/40 backdrop-blur hover:from-pink-600/50 hover:to-purple-700/50"
          >
            <span className="relative z-10">{tech}</span>
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 blur-md transition group-hover/tech:opacity-60 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.8),transparent_70%)]" />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
