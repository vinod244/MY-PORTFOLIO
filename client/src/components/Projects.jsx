import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";
import "./Projects.css";

const projects = [
  {
    number: "01",
    category: "AI / FULL STACK",
    title: "AI News Verifier",
    description:
      "AI-powered web application for detecting potentially misleading news and presenting verification results.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "SQLite",
    ],
    github: "#",
    demo: "#",
  },
  {
    number: "02",
    category: "WEB APPLICATION",
    title: "Eventify",
    description:
      "Modern full-stack event management platform for creating, exploring, and managing events.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "SQLite",
    ],
    github: "#",
    demo: "#",
  },
  {
    number: "03",
    category: "WEB APPLICATION",
    title: "College Notes",
    description:
      "Student platform for uploading, organizing, and sharing academic notes and study materials.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "SQLite",
    ],
    github: "#",
    demo: "#",
  },
  {
    number: "04",
    category: "AI / COMPUTER VISION",
    title: "Computer Vision",
    description:
      "AI-based object detection project exploring practical computer vision applications using YOLO.",
    technologies: [
      "Python",
      "YOLO",
      "Computer Vision",
    ],
    github: "#",
    demo: "#",
  },
];

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects-container">

        {/* HEADER */}
        <div className="projects-header">
          <span className="projects-number">05</span>
          <div>
            <p className="projects-label">
              SELECTED WORK
            </p>
            <h2>
              My <em>Projects</em>
            </h2>
            <p className="projects-intro">
              A selection of projects where I apply
              software development, AI and data
              science to practical problems.
            </p>
          </div>
        </div>

        {/* PROJECTS LIST */}
        <div className="projects-list">
          {projects.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.title}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              {/* PROJECT NUMBER */}
              <div className="project-number">
                {project.number}
              </div>

              {/* PROJECT CONTENT */}
              <div className="project-content">
                <span className="project-category">
                  {project.category}
                </span>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

                {/* TECHNOLOGIES */}
                <div className="project-technologies">
                  {project.technologies.map(
                    (technology) => (
                      <span key={technology}>
                        {technology}
                      </span>
                    )
                  )}
                </div>

                {/* BUTTONS */}
                <div className="project-actions">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FiGithub size={16} />
                    GitHub
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FiExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>

              {/* ARROW */}
              <div className="project-arrow">
                <FiArrowUpRight size={25} />
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;