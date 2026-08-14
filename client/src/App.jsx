import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Main Portfolio */}
      <main>
        {/* Home / Hero */}
        <Hero />

        {/* About Me */}
        <About />

        {/* Education */}
        <Education />

        {/* Technical Skills */}
        <Skills />

        {/* Projects */}
        <Projects />

        {/* Services */}
        <Services />

        {/* Certificates & Achievements */}
        <Certifications />

        {/* Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;