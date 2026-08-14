import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Education", "#education"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
    ["Services", "#services"],
    ["Certifications", "#certifications"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="navbar">
      <a
        href="#home"
        className="navbar-logo"
        onClick={() => setOpen(false)}
      >
        VMB<span>.</span>
      </a>

      <nav className={`navbar-links ${open ? "open" : ""}`}>
        {links.map(([name, href]) => (
          <a
            key={name}
            href={href}
            onClick={() => setOpen(false)}
          >
            {name}
          </a>
        ))}
      </nav>

      <a href="#contact" className="navbar-talk">
        Let's Talk
      </a>

      <button
        className="navbar-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
}

export default Navbar;