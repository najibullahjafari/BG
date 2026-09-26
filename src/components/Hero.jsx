import { motion } from "framer-motion";
import { usePortfolio } from "../lib/usePortfolio";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import SocialLinks from "./SocialLinks";

const coreStack = ["React", "Laravel", "TypeScript", "Python", "PostgreSQL", "MySQL"];

export default function Hero() {
  const { portfolio } = usePortfolio();
  const reduced = usePrefersReducedMotion();
  const enter = (delay = 0) => reduced ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay, ease: "easeOut" } };
  const projectCount = portfolio.projects?.length || 0;
  const experienceCount = portfolio.experience?.length || 0;

  return (
    <section aria-label="Introduction" className="relative flex min-h-full items-center overflow-hidden">
      <div aria-hidden="true" className="hero-aura" />
      <div className="container-site relative grid gap-12 py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-center">
        <div>
          <motion.p {...enter(0)} className="signal-kicker mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-300"><span className="signal-pulse h-2 w-2 rounded-full bg-accent-400" aria-hidden="true" />{portfolio.availability}</motion.p>
          <motion.h1 {...enter(0.05)} className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{portfolio.name}<span className="signal-gradient mt-3 block text-2xl font-semibold sm:text-3xl">{portfolio.title}</span></motion.h1>
          <motion.p {...enter(0.1)} className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">{portfolio.tagline}</motion.p>
          <motion.ul {...enter(0.15)} className="mt-6 flex flex-wrap gap-2" aria-label="Core technologies">{coreStack.map((technology) => <li key={technology} className="badge font-mono">{technology}</li>)}</motion.ul>
          <motion.div {...enter(0.2)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">View selected work</a><a href="#contact" className="btn-secondary">Start a conversation</a>
            {portfolio.github && <a href={portfolio.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" aria-label="Open GitHub profile">GitHub ↗</a>}
          </motion.div>
          <motion.div {...enter(0.25)} className="mt-9"><SocialLinks compact /></motion.div>
        </div>
        <motion.aside {...enter(0.18)} className="card signal-console relative overflow-hidden p-6 sm:p-8" aria-label="Portfolio proof points">
          <div className="signal-orbit" aria-hidden="true"><span /><span /><span /></div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent-300">Proof points</p>
          <h2 className="mt-4 max-w-sm text-2xl font-semibold tracking-tight text-white">Building useful systems, not just polished screens.</h2>
          <div className="mt-8 grid grid-cols-2 gap-3"><ProofPoint value={`${projectCount}+`} label="projects shipped" /><ProofPoint value={`${experienceCount}+`} label="teams supported" /><ProofPoint value="React +" label="Laravel specialist" /><ProofPoint value="A11y" label="built into the work" /></div>
          <p className="mt-7 border-t border-white/10 pt-5 text-sm leading-relaxed text-zinc-400">From admin tools and dashboards to public-facing products, I focus on clear interfaces and dependable delivery.</p>
        </motion.aside>
      </div>
    </section>
  );
}

function ProofPoint({ value, label }) {
  return <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4"><p className="text-lg font-semibold text-accent-300">{value}</p><p className="mt-1 text-xs leading-relaxed text-zinc-500">{label}</p></div>;
}
