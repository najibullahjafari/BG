// src/components/Navbar.jsx
import { useEffect, useState } from "react";

const links = [
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Websites", href: "#websites" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen]);

  const NavLinks = ({ vertical = false, onClick }) => (
    <ul
      className={`flex items-center gap-1 ${vertical ? "flex-col items-stretch" : ""}`}
    >
      {links.map((link) => {
        const isActive = activeId === link.href;
        return (
          <li key={link.name}>
            <a
              href={link.href}
              onClick={onClick}
              aria-current={isActive ? "true" : undefined}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/[0.06] text-white"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {link.name}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/10 bg-surface/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="container-site flex h-16 items-center justify-between"
      >
        <a
          href="#hero"
          className="font-mono text-sm font-bold tracking-tight text-white"
          aria-label="Najibullah Jafari – back to top"
        >
          najibullah<span className="text-accent-400">.jafari</span>
        </a>
        <div className="hidden items-center gap-4 md:flex">
          <NavLinks />
          <a href="#contact" className="btn-primary !px-4 !py-2 text-xs">
            Let's talk
          </a>
        </div>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="rounded-lg p-2 text-zinc-300 hover:text-white md:hidden"
        >
          <span className="sr-only">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-surface/95 px-5 py-4 backdrop-blur-md md:hidden"
        >
          <NavLinks vertical onClick={() => setMenuOpen(false)} />
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-3 w-full"
          >
            Let's talk
          </a>
        </div>
      )}
    </header>
  );
}
