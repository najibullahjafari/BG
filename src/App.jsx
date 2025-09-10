import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Websites from "./components/Websites";
import EducationMentoring from "./components/EducationMentoring";
import Contact from "./components/Contact";
import "./index.css";

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#06060b] text-white font-display">
      <Navbar />
      <div className="pointer-events-none fixed inset-0 -z-50 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      <main className="relative z-10">
        <div className="section-block" id="hero">
          <Hero />
        </div>
        <div className="section-block" id="skills">
          <Skills />
        </div>
        <div className="section-block" id="experience">
          <Experience />
        </div>
        <div className="section-block" id="projects">
          <Projects />
        </div>
        <div className="section-block" id="websites">
          <Websites />
        </div>
        <div className="section-block" id="education">
          <EducationMentoring />
        </div>
        <div className="section-block" id="contact">
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
