import { motion } from "framer-motion";
import { PROFILE_IMAGE } from "../config/profile";
import "./About.css";

function About() {
  const stats = [
    { value: "2028", label: "Expected Graduation" },
    { value: "AI & DS", label: "Specialization" },
    { value: "WEB", label: "Development Focus" },
    { value: "UG", label: "Engineering Student" },
  ];

  return (
    <section className="section about" id="about">
      <div className="container">

        <div className="section-label">
          02 — ABOUT ME
        </div>

        {/* PROFILE IMAGE */}
        <div className="about-profile-wrapper" style={{ marginBottom: "40px" }}>
          <img
            src={PROFILE_IMAGE}
            alt="Vinod M Bhangi"
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              display: "block"
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = PROFILE_IMAGE;
            }}
          />
        </div>

        <div className="about-heading">
          <h2 className="section-title">
            Building ideas
            <br />
            into <em>software.</em>
          </h2>
        </div>

        <div className="about-content">
          <div className="about-intro">
            <p>
              I'm Vinod M Bhangi, an undergraduate engineering
              student specializing in Artificial Intelligence
              and Data Science at S.G. Balekundri Institute of
              Technology.
            </p>
          </div>

          <div className="about-text">
            <p>
              I enjoy solving problems and transforming
              theoretical concepts into practical software
              solutions.
            </p>
            <p>
              My interests include software development,
              web development, artificial intelligence,
              machine learning and data-driven applications.
            </p>
          </div>
        </div>

        <div className="about-stats">
          {stats.map((stat, index) => (
            <motion.div
              className="about-stat"
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default About;