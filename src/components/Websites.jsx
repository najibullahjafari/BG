// src/components/Websites.jsx
import { resume } from "../data/resume";
import { motion } from "framer-motion"; // motion used in animated elements below

export default function Websites() {
  const sites = resume.websites || [];
  if (!sites.length) return null;
  return (
    <section id="websites" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-fuchsia-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]"
        >
          Live Websites
        </motion.h2>
        <ul className="space-y-6">
          {sites.map((site, i) => (
            <motion.li
              key={site.url + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-purple-500/25 bg-white/5 backdrop-blur-xl p-5 shadow-lg hover:border-pink-400/50 hover:shadow-pink-500/30 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-pink-300 drop-shadow-[0_0_6px_rgba(244,114,182,0.45)]">
                    {site.name}
                  </h3>
                  <p className="mt-1 text-sm text-purple-100/80 leading-relaxed max-w-2xl">
                    {site.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600/70 via-purple-600/70 to-indigo-600/70 px-5 py-2.5 text-sm font-semibold text-white shadow shadow-fuchsia-900/40 backdrop-blur hover:from-fuchsia-500 hover:via-purple-500 hover:to-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 transition"
                    aria-label={`Open ${site.name} in new tab`}
                  >
                    Visit
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
