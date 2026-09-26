import { useEffect, useRef, useState } from "react";

const links = [
  { name: "Origin", href: "#hero" },
  { name: "Work", href: "#projects" },
  { name: "Capabilities", href: "#skills" },
  { name: "Journey", href: "#experience" },
  { name: "Systems", href: "#websites" },
  { name: "Knowledge", href: "#education" },
  { name: "Connect", href: "#contact" },
];

export default function Navbar({ activeId, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const activate = (event, href) => {
    event.preventDefault();
    onNavigate(href.slice(1));
    setMenuOpen(false);
  };

  const NavLinks = ({ vertical = false }) => (
    <ul className={`flex items-center gap-1 ${vertical ? "flex-col items-stretch" : ""}`}>
      {links.map((link) => {
        const isActive = activeId === link.href;
        return (
          <li key={link.name}>
            <a href={link.href} onClick={(event) => activate(event, link.href)} aria-current={isActive ? "page" : undefined} className={`network-link ${isActive ? "network-link-active" : ""}`}>
              <span className="network-link-node" aria-hidden="true" />{link.name}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-surface">Skip to screen</a>
      <nav aria-label="Primary" className="network-nav pointer-events-auto">
        <a href="#hero" onClick={(event) => activate(event, "#hero")} className="network-brand" aria-label="Najibullah Jafari — origin screen"><span className="brand-signal" aria-hidden="true" />NJ<span>↗</span></a>
        <div className="hidden items-center lg:flex"><NavLinks /></div>
        <div className="hidden items-center gap-2 sm:flex lg:hidden"><span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{links.find((link) => link.href === activeId)?.name}</span></div>
        <button ref={menuButtonRef} type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu" className="network-menu-trigger lg:hidden">
          <span className="sr-only">{menuOpen ? "Close navigation" : "Open navigation"}</span><span /><span />
        </button>
      </nav>
      {menuOpen && <div id="mobile-menu" className="network-menu pointer-events-auto lg:hidden"><p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-accent-300">Choose a signal</p><NavLinks vertical /></div>}
    </header>
  );
}
