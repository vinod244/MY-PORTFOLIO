import { motion } from "framer-motion";
import "./Services.css";

const services = [
  {
    number: "01",
    title: "Full-Stack Web Development",
    description:
      "Building responsive, dynamic, and scalable web applications from scratch using modern frameworks like React, Node.js, and Express.",
  },
  {
    number: "02",
    title: "AI & Machine Learning Solutions",
    description:
      "Integrating intelligent features, data-driven pipelines, and computer vision models into practical, real-world software systems.",
  },
  {
    number: "03",
    title: "Database Design & Management",
    description:
      "Structuring secure, reliable, and optimized database architectures using SQLite and relational systems to handle application data smoothly.",
  },
  {
    number: "04",
    title: "Performance & Code Optimization",
    description:
      "Refactoring legacy or sluggish codebases, improving UI/UX responsiveness, and ensuring clean, maintainable software standards.",
  },
];

function Services() {
  return (
    <section className="services" id="services">
      <div className="services-container">

        {/* HEADER */}
        <div className="services-header">
          <span className="services-number">06</span>
          <div>
            <p className="services-label">WHAT I BUILD</p>
            <h2>My <em>Services</em></h2>
            <p className="services-intro">
              Specialized technical skills and development capabilities I offer to transform ideas into robust digital solutions.
            </p>
          </div>
        </div>

        {/* SERVICES LIST */}
        <div className="services-list">
          {services.map((service, index) => (
            <motion.div
              className="service-card"
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="service-number">{service.number}</div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;