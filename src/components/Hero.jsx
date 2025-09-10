// src/components/Hero.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagicParticles from "./MagicParticles";
import LangAvatars from "./LangAvatars";
const __motionHeroRef = motion; // linter workaround if needed

export default function Hero() {
  const ref = useRef(null);
  // Observe scroll over the hero viewport height
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Horizontal slide (0 -> 35% scroll)
  const x = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    prefersReduced ? [0, 0, 0] : [0, 420, 420]
  );
  // After horizontal completes begin downward drift (35% -> 80%)
  const y = useTransform(
    scrollYProgress,
    [0, 0.35, 0.8, 1],
    prefersReduced ? [0, 0, 0, 0] : [0, 0, 280, 320]
  );
  // Fade out near end
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.7, 0.9, 1],
    prefersReduced ? [1, 1, 1, 1] : [1, 1, 0.3, 0]
  );
  const filter = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    prefersReduced
      ? ["blur(0px)", "blur(0px)", "blur(0px)"]
      : ["blur(0px)", "blur(0px)", "blur(6px)"]
  ); // replaces blur.to

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden"
    >
      <MagicParticles />
      <motion.div
        style={{ x, y, opacity, filter }}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center max-w-3xl px-6"
      >
        <motion.h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6">
          Najibullah Jafari
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-2xl md:text-3xl font-semibold text-purple-300 mb-8"
        >
          Full-stack Web Developer
        </motion.h2>
        <LangAvatars />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-4 text-lg text-purple-100/90 leading-relaxed max-w-2xl"
        >
          Certified Full-stack web developer skilled in crafting innovative
          programs for organizational efficiency. Specializing in Laravel and
          React for reliable and user-friendly systems.
        </motion.p>
      </motion.div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest text-purple-300/70 animate-pulse">
        SCROLL
      </div>
    </section>
  );
}
