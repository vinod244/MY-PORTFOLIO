function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "30px 5%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <strong>VINOD M BHANGI</strong>

        <span>
          AI & Data Science Student | Software Developer
        </span>

        <span>
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}

export default Footer;