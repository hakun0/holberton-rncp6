import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">© 2026 Melo — Transforme n'importe quelle musique en partition jouable.</p>
        <div className="footer__links">
          <a href="#">Confidentialité</a>
          <a href="#">CGU</a>
          <Link to="/contact">contact</Link>
        </div>
        <div className="key-divider footer__keys">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
    </footer>
  );
}
