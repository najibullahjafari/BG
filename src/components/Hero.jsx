import { motion, useReducedMotion } from "framer-motion";
import { usePortfolio } from "../lib/usePortfolio";
import SocialLinks from "./SocialLinks";

const coreStack = ["React", "Laravel", "TypeScript", "Python", "PostgreSQL", "MySQL"];

export default function Hero() {
  const { portfolio } = usePortfolio();
  const reduced = useReducedMotion();
  const enter = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: "easeOut" },
        };
  const projectCount = portfolio.projects?.length || 0;
  const experienceCount = portfolio.experience?.length || 0;

  return (
    <section aria-label="Introduction" className="relative flex min-h-[78vh] items-center overflow-hidden pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(124,58,237,0.14),transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="container-site relative grid gap-12 py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-center">
        <div>
          <motion.p {...enter(0)} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            {portfolio.availability}
          </motion.p>
          <motion.h1 {...enter(0.05)} className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {portfolio.name}
            <span className="mt-3 block text-2xl font-semibold text-accent-300 sm:text-3xl">{portfolio.title}</span>
          </motion.h1>
          <motion.p {...enter(0.1)} className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">{portfolio.tagline}</motion.p>
          <motion.ul {...enter(0.15)} className="mt-6 flex flex-wrap gap-2" aria-label="Core technologies">
            {coreStack.map((technology) => <li key={technology} className="badge font-mono">{technology}</li>)}
          </motion.ul>
          <motion.div {...enter(0.2)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">View selected work</a>
            <a href="#contact" className="btn-secondary">Start a conversation</a>
            {portfolio.github && <a href={portfolio.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" aria-label="Open GitHub profile">GitHub ↗</a>}
          </motion.div>
          <motion.div {...enter(0.25)} className="mt-9"><SocialLinks compact /></motion.div>
        </div>
        <motion.aside {...enter(0.18)} className="card relative overflow-hidden p-6 sm:p-8" aria-label="Portfolio proof points">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-400/10 blur-3xl" />
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent-300">Proof points</p>
          <h2 className="mt-4 max-w-sm text-2xl font-semibold tracking-tight text-white">Building useful systems, not just polished screens.</h2>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <ProofPoint value={`${projectCount}+`} label="projects shipped" />
            <ProofPoint value={`${experienceCount}+`} label="teams supported" />
            <ProofPoint value="React +" label="Laravel specialist" />
            <ProofPoint value="A11y" label="built into the work" />
          </div>
          <p className="mt-7 border-t border-white/10 pt-5 text-sm leading-relaxed text-zinc-400">From admin tools and dashboards to public-facing products, I focus on clear interfaces and dependable delivery.</p>
        </motion.aside>
      </div>
    </section>
  );
}

function ProofPoint({ value, label }) {
  return <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4"><p className="text-lg font-semibold text-accent-300">{value}</p><p className="mt-1 text-xs leading-relaxed text-zinc-500">{label}</p></div>;
}
