import { motion } from "framer-motion";
import "./Skills.css";

const skillGroups = [
  {
    title: "Programming",
    skills: ["Python", "Java", "C", "JavaScript"],
  },
  {
    title: "Web Development",
    skills: [
      "HTML",
      "CSS",
      "React",
      "Node.js",
      "Express.js",
    ],
  },
  {
    title: "AI & Data Science",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
    ],
  },
  {
    title: "Databases",
    skills: ["SQL", "SQLite", "MySQL"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code"],
  },
  {
    title: "Core Skills",
    skills: [
      "Data Structures & Algorithms",
      "Problem Solving",
      "OOP",
      "DBMS",
    ],
  },
];

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills-container">

        <div className="skills-header">
          <span className="skills-number">04</span>

          <div>
            <p className="skills-label">
              WHAT I WORK WITH
            </p>

            <h2>
              Technical <em>Skills</em>
            </h2>
          </div>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <motion.div
              className="skill-card"
              key={group.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <div className="skill-card-number">
                0{index + 1}
              </div>

              <h3>{group.title}</h3>

              <div className="skill-list">
                {group.skills.map((skill) => (
                  <span key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;