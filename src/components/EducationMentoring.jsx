// src/components/EducationMentoring.jsx
import { resume } from "../data/resume";
import { motion } from "framer-motion";
const __motionEdu = motion;

export default function EducationMentoring() {
  const education = resume.education || [];
  const mentoring = resume.mentoring;
  return (
    <section id="education" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Header />
        <div className="mt-14 grid gap-14 lg:grid-cols-2">
          <EduTimeline education={education} />
          <MentorCard mentoring={mentoring} />
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <h2 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-fuchsia-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(168,85,247,0.35)]">
        Growth & Impact
      </h2>
      <p className="mx-auto max-w-2xl text-sm md:text-base text-purple-100/80 leading-relaxed">
        Academic journey and mentoring impact, visualized with a magical
        timeline.
      </p>
    </motion.div>
  );
}

function EduTimeline({ education }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-fuchsia-400/60 via-purple-400/30 to-transparent" />
      <ul className="space-y-10 pl-12">
        {education.map((e, i) => (
          <motion.li
            key={e.institution + i}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="relative"
          >
            <span className="absolute -left-[42px] top-2 h-4 w-4 rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 ring-4 ring-[#0b0b12] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_18px_-2px_rgba(168,85,247,0.65)]" />
            <div className="group rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-xl p-6 shadow-lg hover:border-pink-400/40 transition relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_25%_20%,rgba(236,72,153,0.25),transparent_70%)]" />
              <h3 className="text-xl font-semibold text-pink-200 drop-shadow mb-1 flex items-center gap-2">
                {e.institution}
                <span className="text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-fuchsia-600/40 text-fuchsia-100/90 ring-1 ring-fuchsia-400/40">
                  {e.period}
                </span>
              </h3>
              <p className="text-purple-100/80 text-sm leading-relaxed">
                {e.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function MentorCard({ mentoring }) {
  if (!mentoring) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8 }}
      id="mentoring"
      className="relative rounded-3xl border border-purple-500/25 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-[1px] shadow-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="relative h-full w-full rounded-3xl bg-[#0d0d16]/90 backdrop-blur-xl p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-600 shadow-lg shadow-purple-900/40 ring-1 ring-fuchsia-400/40">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="animate-pulse"
            >
              <path
                d="M12 2L3 7l9 5 9-5-9-5Zm0 7L3 14l9 5 9-5-9-5Z"
                fill="#f0abfc"
              />
            </svg>
          </span>
          <h3 className="text-2xl font-bold text-pink-200 drop-shadow">
            Mentoring Impact
          </h3>
        </div>
        <div className="space-y-4 text-sm text-purple-100/85 leading-relaxed">
          <p>
            <strong className="text-pink-300/90">Role:</strong> {mentoring.role}{" "}
            @ {mentoring.organization}
          </p>
          <p>
            <strong className="text-pink-300/90">Period:</strong>{" "}
            {mentoring.period}
          </p>
          <p>{mentoring.description}</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 text-[11px] font-semibold uppercase tracking-wide text-center">
          <Stat label="Sessions" value="150+" />
          <Stat label="Reviews" value="300+" />
          <Stat label="Mentees" value="3+" />
          <Stat label="Perf Gain" value="20%" />
        </div>
        <div className="mt-6">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 animate-[pulse_4s_ease-in-out_infinite]" />
          </div>
          <p className="mt-2 text-[11px] tracking-wider text-purple-300/70">
            Continuous Impact Progress
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="relative rounded-xl bg-white/5 p-3 ring-1 ring-white/10 shadow-inner shadow-black/40">
      <div className="text-pink-300 text-lg font-bold drop-shadow mb-1">
        {value}
      </div>
      <div className="text-[10px] tracking-wider text-purple-200/70">
        {label}
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-fuchsia-500/0 via-fuchsia-500/0 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}

// Reinsert full component (could not partially patch due to linter context)
import { resume as _resume_reload } from "../data/resume"; // noop to prevent tree-shake (optional)
