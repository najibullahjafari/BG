// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", href: "#hero" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Websites", href: "#websites" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(false); // when true: reduced glow / muted theme
  const lastY = useRef(0);

  // Restore saved active section
  useEffect(() => {
    const saved = localStorage.getItem("last-active-section");
    if (saved) {
      const idx = links.findIndex((l) => l.href === saved);
      if (idx !== -1) setActive(idx);
    }
  }, []);

  // Persist active section
  useEffect(() => {
    localStorage.setItem("last-active-section", links[active].href);
  }, [active]);

  // Initialize muted from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("glow-muted");
    if (saved === "1") setMuted(true);
  }, []);

  // Persist muted preference & root class toggle
  useEffect(() => {
    localStorage.setItem("glow-muted", muted ? "1" : "0");
    const root = document.documentElement;
    if (muted) root.classList.add("theme-muted");
    else root.classList.remove("theme-muted");
  }, [muted]);

  // Scroll state (only shrink background, header always visible now)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy with adjusted threshold
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = links.findIndex((l) => l.href === `#${e.target.id}`);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.32 }
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Auto close menu on hash change
  useEffect(() => {
    const handler = () => setMenuOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const NavLinks = ({ vertical = false, onClick }) => (
    <ul
      className={`flex ${
        vertical ? "flex-col mt-3" : "flex-row"
      } items-center gap-2`}
    >
      {links.map((link, idx) => {
        const isActive = active === idx;
        return (
          <li key={link.name} className="relative group">
            <a
              href={link.href}
              onClick={() => {
                setActive(idx);
                onClick && onClick();
              }}
              className={`relative block px-5 py-2 text-sm font-semibold tracking-wide rounded-full transition-colors duration-300 ${
                isActive ? "text-white" : "text-purple-200/70 hover:text-white"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={`relative z-10 ${
                  !muted
                    ? "mix-blend-screen drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]"
                    : ""
                }`}
              >
                {link.name}
              </span>
              {/* Underline animation in muted mode */}
              {muted && (
                <span
                  className={`pointer-events-none absolute left-4 right-4 -bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 transition-[transform] duration-500 ease-out ${
                    isActive ? "scale-x-100" : "group-hover:scale-x-100"
                  } will-change-transform`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                ></span>
              )}
              {isActive && (
                <AnimatePresence>
                  <motion.span
                    key="island"
                    layoutId="island"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 30,
                      mass: 0.6,
                    }}
                    className={`pointer-events-none absolute inset-0 rounded-full -z-10 ${
                      !muted
                        ? "bg-gradient-to-br from-purple-500/40 via-fuchsia-500/30 to-teal-400/30 shadow-lg shadow-purple-900/30"
                        : "bg-white/5"
                    }`}
                  />
                </AnimatePresence>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50`}>
      <nav
        className={`relative flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-2xl border border-purple-500/25 transition-all duration-500 ${
          scrolled
            ? "bg-white/10 shadow-[0_0_18px_-4px_rgba(168,85,247,0.35)]"
            : "bg-white/5 shadow-[0_0_25px_-6px_rgba(168,85,247,0.45)]"
        }`}
        aria-label="Primary"
      >
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden relative z-20 rounded-full p-2 text-purple-200/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-current transition ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-current transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-current transition ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            ></span>
          </div>
        </button>
        <div className="hidden md:block">
          <NavLinks />
        </div>
        <button
          onClick={() => setMuted((m) => !m)}
          className="ml-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-purple-100 hover:bg-white/20 transition"
          title="Toggle reduced glow"
        >
          {muted ? "Vibrant" : "Muted"}
        </button>
        {menuOpen && (
          <div className="absolute top-full left-1/2 mt-3 w-[280px] -translate-x-1/2 rounded-2xl border border-purple-500/30 bg-[#0b0b12]/90 p-4 shadow-2xl backdrop-blur-xl md:hidden">
            <NavLinks vertical onClick={() => setMenuOpen(false)} />
          </div>
        )}
      </nav>
    </div>
  );
}
