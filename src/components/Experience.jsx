// src/components/Experience.jsx
import { resume } from "../data/resume";
import { motion } from "framer-motion";
const __motionExperience = motion;

export default function Experience() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.18 } },
  };
  const card = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
  return (
    <section className="relative py-24 text-white" id="experience">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold mb-12 text-center tracking-tight drop-shadow-lg"
        >
          Magical Experience
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-10"
        >
          {resume.experience.map((exp) => (
            <motion.div
              key={exp.company}
              variants={card}
              whileHover={{ scale: 1.03, boxShadow: "0 0 24px #a78bfa" }}
              className="bg-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl border border-purple-400/30 hover:border-pink-400/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-purple-300 mb-4 tracking-wide flex items-center gap-2">
                <span className="inline-block animate-spin-slow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#a78bfa" />
                  </svg>
                </span>
                {exp.role} @ {exp.company}
              </h3>
              <p className="text-gray-200 mb-2 text-lg font-medium">
                {exp.period} | {exp.location}
              </p>
              <p className="text-gray-300 text-base leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
