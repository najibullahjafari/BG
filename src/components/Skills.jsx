// src/components/Skills.jsx
import { resume } from "../data/resume";
import { motion } from "framer-motion";
const __motionSkills = motion;

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const card = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
  return (
    <section className="relative py-24 text-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold mb-12 text-center tracking-tight drop-shadow-lg"
        >
          Magical Skills
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {Object.entries(resume.skills).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={card}
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px #a78bfa" }}
              className="bg-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl border border-indigo-900/40"
            >
              <h3 className="text-2xl font-bold mb-6 capitalize text-purple-300 tracking-wide flex items-center gap-2">
                <span className="inline-block animate-bounce">
                  {category === "frontend" && (
                    <span className="text-cyan-300 font-semibold">FE</span>
                  )}
                  {category === "backend" && (
                    <span className="text-blue-300 font-semibold">BE</span>
                  )}
                  {category === "tools" && (
                    <span className="text-amber-300 font-semibold">TL</span>
                  )}
                  {category === "professional" && (
                    <span className="text-violet-300 font-semibold">PR</span>
                  )}
                  {category === "problemSolving" && (
                    <span className="text-pink-300 font-semibold">PS</span>
                  )}
                </span>
                {category.replace(/([A-Z])/g, " $1")}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="px-4 py-2 bg-purple-700/70 rounded-full text-sm font-medium hover:bg-pink-500 transition-colors duration-300 cursor-pointer shadow-md backdrop-blur-sm"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
