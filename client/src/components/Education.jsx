import { motion } from "framer-motion";
import "./Education.css";

const educationData = [
  {
    year: "2024–2028",
    degree: "B.E. – Artificial Intelligence & Data Science",
    institution: "S.G. Balekundri Institute of Technology, Belagavi",
    status: "Currently Pursuing",
  },
  {
    year: "2023",
    degree: "12th / PUC",
    institution: "Rabindranath Tagore PU College, Belagavi",
    status: "Completed",
  },
  {
    year: "2021",
    degree: "10th / SSLC",
    institution: "Shantiniketan Public School, Khanapur, Belagavi",
    status: "Completed",
  },
];

function Education() {
  return (
    <section className="education" id="education">
      <div className="education-container">

        <div className="education-header">
          <span className="section-number">03</span>

          <div>
            <p className="section-label">ACADEMIC JOURNEY</p>

            <h2>
              My <em>Education</em>
            </h2>
          </div>
        </div>

        <div className="education-timeline">

          {educationData.map((item, index) => (
            <motion.div
              className="education-item"
              key={item.degree}
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
                duration: 0.6,
                delay: index * 0.15,
              }}
            >

              <div className="education-year">
                {item.year}
              </div>

              <div className="education-line">
                <span className="education-dot"></span>
              </div>

              <div className="education-card">

                <span className="education-status">
                  {item.status}
                </span>

                <h3>{item.degree}</h3>

                <p className="education-institution">
                  {item.institution}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Education;