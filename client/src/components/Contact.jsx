import { Mail, Phone } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-label">
          09 — CONTACT
        </div>

        <h2 className="section-title">
          Let's <em>connect.</em>
        </h2>
        
        <div className="contact-links" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="contact-info" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
            <Mail size={24} />
            <a href="mailto:vinodbhangi23@gmail.com" style={{ textDecoration: 'none', color: 'inherit', fontWeight: '500' }}>
              vinodbhangi23@gmail.com
            </a>
          </div>
          
          <div className="contact-info" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
            <Phone size={24} />
            <a href="tel:9482758901" style={{ textDecoration: 'none', color: 'inherit', fontWeight: '500' }}>
              +91 9482758901
            </a>
          </div>
          
          <div className="contact-info" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
            <Linkedin size={24} />
            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', fontWeight: '500' }}>
              LinkedIn Profile
            </a>
          </div>
          
          <div className="contact-info" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
            <Github size={24} />
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', fontWeight: '500' }}>
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;