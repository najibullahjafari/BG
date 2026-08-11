// src/components/Experience.jsx
import { resume } from "../data/resume";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Experience() {
  // Most recent first
  const jobs = [...resume.experience].reverse();
  return (
    <section className="py-24" aria-label="Work experience">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Experience"
            title="Where I've worked"
            description="Production systems for real organizations — on-site and remote."
          />
        </Reveal>
        <ol className="relative ml-3 border-l border-white/10">
          {jobs.map((exp, i) => (
            <li key={exp.company} className="relative pb-12 pl-8 last:pb-0">
              <span
                className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-accent-500"
                aria-hidden="true"
              />
              <Reveal delay={i * 0.05}>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                  {exp.period} · {exp.location}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {exp.role}{" "}
                  <span className="font-normal text-zinc-400">
                    · {exp.company}
                  </span>
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                  {exp.description}
                </p>
                {exp.tech && (
                  <ul
                    className="mt-3 flex flex-wrap gap-2"
                    aria-label="Technologies used"
                  >
                    {exp.tech.map((t) => (
                      <li key={t} className="badge">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
