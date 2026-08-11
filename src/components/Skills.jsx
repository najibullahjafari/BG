// src/components/Skills.jsx
import { resume } from "../data/resume";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section className="py-24" aria-label="Technical skills">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Capabilities"
            title="What I work with"
            description="Organized by how I actually use these tools day to day — not a wall of logos."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resume.skills.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.05}>
              <div className="card card-hover h-full p-6">
                <h3 className="text-base font-semibold text-white">
                  {group.label}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  {group.blurb}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li key={skill} className="badge">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.25}>
            <div className="card card-hover h-full p-6">
              <h3 className="text-base font-semibold text-white">
                Competitive programming
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                Algorithmic problem solving, verified in competition.
              </p>
              <ul className="mt-4 space-y-2">
                {resume.achievements.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2 text-sm text-zinc-300"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                      aria-hidden="true"
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
