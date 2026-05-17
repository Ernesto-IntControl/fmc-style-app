function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <button className="footer-brand" onClick={() => setPage("home")}>
          FMC STYLE
        </button>
        <nav>
          <button onClick={() => setPage("services")}>Services</button>
          <button onClick={() => setPage("promotions")}>Promotions</button>
          <button onClick={() => setPage("blog")}>Blog & Conseils</button>
          <button onClick={() => setPage("about")}>A propos</button>
          <button onClick={() => setPage("chat")}>Conciergerie</button>
        </nav>
        <div className="footer-socials" aria-label="Reseaux sociaux">
          <span>IG</span>
          <span>LI</span>
          <span>PT</span>
        </div>
        <small>(c) 2026 FMC STYLE. Une experience de minimalisme moderne.</small>
      </div>
    </footer>
  );
}

export default Footer;
