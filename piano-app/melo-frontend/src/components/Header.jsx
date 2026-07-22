import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ loggedIn = false, secondaryLink = "historique" }) {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  // Lit l'email au chargement du composant
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    navigate("/");
  };

  // L'utilisateur est considéré comme connecté si la prop loggedIn est true OU si un email est dans le localStorage
  const isUserLoggedIn = loggedIn || !!userEmail;

  return (
    <header className="header">
      <div className="container header__inner">
        {/* LOGO CLIQUABLE (Redirige vers l'accueil) */}
        <Link to="/" className="header__logo">
          <span className="header__logo-mark" aria-hidden="true">
            ♪
          </span>
          MELO
        </Link>

        <div className="header__actions">
          {/* BOUTON MON COMPTE */}
          <Link to="/compte" className="btn btn-cream header__pill">
            <span aria-hidden="true">☰</span> mon compte
          </Link>

          {/* BOUTON HISTORIQUE / ACCUEIL */}
          {secondaryLink === "historique" ? (
            <Link to="/historique" className="btn btn-cream header__pill">
              <span aria-hidden="true">◷</span> Historique
            </Link>
          ) : (
            <Link to="/" className="btn btn-cream header__pill">
              <span aria-hidden="true">⌂</span> accueil
            </Link>
          )}

          {/* SI CONNECTÉ : AFFICHE L'EMAIL ET LE BOUTON DECONNEXION */}
          {isUserLoggedIn ? (
            <>
              {userEmail && (
                <span className="header__user-email" style={{ fontSize: "0.85rem", color: "#e0e0e0" }}>
                  <strong style={{ color: "var(--gold)" }}>{userEmail}</strong>
                </span>
              )}
              <button 
                onClick={handleLogout} 
                className="btn btn-wine" 
                style={{ cursor: "pointer" }}
              >
                déconnexion
              </button>
            </>
          ) : (
            /* SI NON CONNECTÉ : AFFICHE CONNEXION / INSCRIPTION */
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
