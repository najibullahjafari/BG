import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Websites from "./components/Websites";
import EducationMentoring from "./components/EducationMentoring";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { PortfolioProvider } from "./lib/PortfolioContext";
import { usePrefersReducedMotion } from "./lib/usePrefersReducedMotion";
import "./index.css";

const screens = [
  { id: "hero", label: "Origin", component: Hero },
  { id: "projects", label: "Work", component: Projects },
  { id: "skills", label: "Capabilities", component: Skills },
  { id: "experience", label: "Journey", component: Experience },
  { id: "websites", label: "Live systems", component: Websites },
  { id: "education", label: "Knowledge", component: EducationMentoring },
  { id: "contact", label: "Connect", component: Contact },
];

function getInitialScreen() {
  const hash = window.location.hash.slice(1);
  return screens.some((screen) => screen.id === hash) ? hash : "hero";
}

function App() {
  const [activeScreen, setActiveScreen] = useState(getInitialScreen);
  const reducedMotion = usePrefersReducedMotion();
  const activeIndex = screens.findIndex((screen) => screen.id === activeScreen);
  const screen = screens[activeIndex] || screens[0];
  const ActiveComponent = screen.component;

  const adjacentScreens = useMemo(
    () => ({
      previous: screens[(activeIndex - 1 + screens.length) % screens.length],
      next: screens[(activeIndex + 1) % screens.length],
    }),
    [activeIndex],
  );

  const navigate = (id) => {
    if (!screens.some((item) => item.id === id)) return;
    setActiveScreen(id);
    window.history.pushState(null, "", `#${id}`);
  };

  useEffect(() => {
    const onHistoryChange = () => setActiveScreen(getInitialScreen());
    window.addEventListener("popstate", onHistoryChange);
    window.addEventListener("hashchange", onHistoryChange);
    return () => {
      window.removeEventListener("popstate", onHistoryChange);
      window.removeEventListener("hashchange", onHistoryChange);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      const tag = event.target?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      if (event.key === "ArrowRight") navigate(adjacentScreens.next.id);
      if (event.key === "ArrowLeft") navigate(adjacentScreens.previous.id);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [adjacentScreens]);

  return (
    <PortfolioProvider>
      <div className="screen-shell bg-surface font-display text-zinc-200">
        <NetworkField />
        <Navbar activeId={`#${activeScreen}`} onNavigate={navigate} />
        <main id="main" className="screen-stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeScreen}
              className="screen-panel"
              initial={reducedMotion ? false : { opacity: 0, filter: "blur(12px)", scale: 1.015 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, filter: "blur(10px)", scale: 0.985 }}
              transition={{ duration: reducedMotion ? 0 : 0.46, ease: [0.22, 1, 0.36, 1] }}
              aria-label={`${screen.label} screen`}
            >
              <div className="screen-scroll">
                <ActiveComponent />
                {activeScreen === "contact" && <Footer />}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
        <div className="screen-coordinate" aria-live="polite">
          <span className="screen-index">0{activeIndex + 1}</span>
          <span className="screen-node" aria-hidden="true" />
          <span>{screen.label}</span>
        </div>
        <div className="screen-switcher" aria-label="Screen controls">
          <a href={`#${adjacentScreens.previous.id}`} onClick={(event) => { event.preventDefault(); navigate(adjacentScreens.previous.id); }} aria-label={`Previous screen: ${adjacentScreens.previous.label}`}>←</a>
          <span>{activeIndex + 1} / {screens.length}</span>
          <a href={`#${adjacentScreens.next.id}`} onClick={(event) => { event.preventDefault(); navigate(adjacentScreens.next.id); }} aria-label={`Next screen: ${adjacentScreens.next.label}`}>→</a>
        </div>
      </div>
    </PortfolioProvider>
  );
}

function NetworkField() {
  const nodes = [["220", "94"], ["418", "214"], ["690", "82"], ["925", "196"], ["1190", "90"], ["180", "518"], ["365", "672"], ["625", "506"], ["860", "640"], ["1098", "468"]];
  return (
    <div className="network-field" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="network-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c8f34a" stopOpacity="0" />
            <stop offset="0.45" stopColor="#c8f34a" stopOpacity="0.62" />
            <stop offset="1" stopColor="#5ad6be" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="node-glow"><stop offset="0" stopColor="#efffb4" /><stop offset="1" stopColor="#c8f34a" stopOpacity="0" /></radialGradient>
        </defs>
        <g className="network-lines">
          <path d="M-80 165L220 94 418 214 690 82 925 196 1190 90 1520 210" />
          <path d="M-90 610L180 518 365 672 625 506 860 640 1098 468 1500 585" />
          <path d="M220 94L180 518M418 214L365 672M690 82L625 506M925 196L860 640M1190 90L1098 468" />
          <path d="M-40 374L180 518 418 214 625 506 925 196 1098 468 1480 340" />
        </g>
        <path className="network-signal" d="M-80 165L220 94 418 214 690 82 925 196 1190 90 1520 210" />
        <g className="network-nodes">{nodes.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" />)}</g>
      </svg>
    </div>
  );
}

export default App;
