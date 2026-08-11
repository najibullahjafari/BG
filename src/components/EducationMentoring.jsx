// src/components/EducationMentoring.jsx
import { resume } from "../data/resume";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function EducationMentoring() {
  const education = resume.education || [];
  const mentoring = resume.mentoring;
  return (
    <section className="py-24" aria-label="Education and mentoring">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Background"
            title="Education & mentoring"
            description="Formal study, intensive training, and giving back through mentorship."
          />
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ol className="relative ml-3 border-l border-white/10">
            {education.map((e, i) => (
              <li
                key={e.institution + i}
                className="relative pb-10 pl-8 last:pb-0"
              >
                <span
                  className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-accent-500"
                  aria-hidden="true"
                />
                <Reveal delay={i * 0.05}>
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                    {e.period}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-white">
                    {e.institution}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {e.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
          {mentoring && (
            <Reveal delay={0.1}>
              <div className="card h-fit p-6" id="mentoring">
                <h3 className="text-base font-semibold text-white">
                  {mentoring.role} · {mentoring.organization}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-zinc-500">
                  {mentoring.period}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {mentoring.description}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
