import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { PROFILE_IMAGE } from "../config/profile";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* TOP */}
        <div className="hero-top">
          <span>AI & DATA SCIENCE</span>
          <span>SOFTWARE DEVELOPER</span>
          <span>2028</span>
        </div>

        {/* MAIN */}
        <div className="hero-main">

          {/* NAME */}
          <motion.div
            className="hero-heading"
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <div className="hero-intro">
              HEY, I'M
            </div>

            <h1>
              VINOD
              <br />
              <em>M BHANGI</em>
            </h1>

            <div className="hero-role">
              AI & DATA SCIENCE STUDENT
            </div>
          </motion.div>

          {/* PROFILE */}
          <motion.div
            className="hero-photo-container"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            <div className="hero-photo">
              <img
                src={PROFILE_IMAGE}
                alt="Vinod M Bhangi"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = PROFILE_IMAGE;
                }}
              />

              <div className="hero-photo-ai">
                AI / DS
              </div>
            </div>

            <div className="hero-photo-tag">
              <span>01</span>
              <span>PROFILE</span>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM */}
        <div className="hero-bottom">

          <div className="hero-description">
            <span className="hero-number">
              01
            </span>

            <p>
              An Artificial Intelligence and Data
              Science engineering student building
              practical software solutions through
              AI, data and modern web technologies.
            </p>
          </div>

          <div className="hero-actions">

            <a
              href="#projects"
              className="hero-btn-primary"
            >
              <span>Explore Work</span>
              <ArrowDownRight size={18} />
            </a>

            <a
              href="#contact"
              className="hero-btn-secondary"
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={16} />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;