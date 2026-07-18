import { Link, NavLink } from "react-router-dom";
import "./Header.css";

export default function Header({ loggedIn = false, secondaryLink = "historique" }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-mark" aria-hidden="true">
            ♪
          </span>
          MELO
        </Link>

        <div className="header__actions">
          {loggedIn ? (
            <Link to="/compte" className="btn btn-cream header__pill">
              <span aria-hidden="true">☰</span> mon compte
            </Link>
          ) : (
            <Link to="/compte" className="btn btn-cream header__pill">
              <span aria-hidden="true">☰</span> mon compte
            </Link>
          )}

          {secondaryLink === "historique" ? (
            <Link to="/historique" className="btn btn-cream header__pill">
              <span aria-hidden="true">◷</span> Historique
            </Link>
          ) : (
            <Link to="/" className="btn btn-cream header__pill">
              <span aria-hidden="true">⌂</span> accueil
            </Link>
          )}

          {!loggedIn && (
            <>
              <Link to="/connexion" className="btn btn-wine">
                connexion
              </Link>
              <Link to="/inscription" className="btn btn-red">
                créer un compte
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
