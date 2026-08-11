import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Websites from "./components/Websites";
import EducationMentoring from "./components/EducationMentoring";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-surface font-display text-zinc-200">
      <Navbar />
      <main id="main">
        <div id="hero">
          <Hero />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="websites">
          <Websites />
        </div>
        <div id="education">
          <EducationMentoring />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
