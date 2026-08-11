// src/components/Hero.jsx
import { motion, useReducedMotion } from "framer-motion";
import { resume } from "../data/resume";
import SocialLinks from "./SocialLinks";

const coreStack = [
  "React",
  "Laravel",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "MySQL",
];

export default function Hero() {
  const reduced = useReducedMotion();
  const enter = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: "easeOut" },
        };

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-16"
    >
      {/* Subtle, static background texture — no JS animation cost */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(124,58,237,0.14),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="container-site relative py-20">
        <motion.p
          {...enter(0)}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300"
        >
          <span
            className="h-2 w-2 rounded-full bg-emerald-400"
            aria-hidden="true"
          />
          {resume.availability}
        </motion.p>
        <motion.h1
          {...enter(0.05)}
          className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {resume.name}
          <span className="mt-3 block text-2xl font-semibold text-accent-300 sm:text-3xl">
            {resume.title}
          </span>
        </motion.h1>
        <motion.p
          {...enter(0.1)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400"
        >
          {resume.tagline}
        </motion.p>
        <motion.ul
          {...enter(0.15)}
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Core technologies"
        >
          {coreStack.map((t) => (
            <li key={t} className="badge font-mono">
              {t}
            </li>
          ))}
        </motion.ul>
        <motion.div
          {...enter(0.2)}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className="btn-primary">
            View my work
          </a>
          <a href="#contact" className="btn-secondary">
            Start a conversation
          </a>
        </motion.div>
        <motion.div {...enter(0.25)} className="mt-9">
          <SocialLinks compact />
        </motion.div>
      </div>
    </section>
  );
}
