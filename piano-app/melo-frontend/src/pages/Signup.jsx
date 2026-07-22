import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Vérification basique de mot de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      // 🚀 ENVOI DU FORMULAIRE VERS LE BACKEND
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Affiche l'erreur renvoyée par le backend (ex: "Email déjà utilisé")
        throw new Error(data.detail || "Erreur lors de l'inscription.");
      }

      // 🎯 SI SUCCÈS : On redirige vers la page de connexion
      alert("Compte créé avec succès ! Tu peux maintenant te connecter.");
      navigate("/connexion");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="auth">
        <div className="container auth__inner">
          <form className="auth__card card" onSubmit={handleSubmit}>
            <div className="auth__brand">
              <span className="auth__brand-mark" aria-hidden="true">
                ♪
              </span>
              <h1 className="auth__brand-title">MELO</h1>
            </div>

            <p className="auth__intro">
              Inscris-toi. Si tu as déjà un compte, <Link to="/connexion">connecte-toi</Link>.
            </p>

            {/* Affichage des messages d'erreur s'il y en a */}
            {error && (
              <div style={{ color: "#ff4d4d", marginBottom: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
                {error}
              </div>
            )}

            <label className="field-label" htmlFor="email">
              adresse mail
            </label>
            <input 
              className="field-input auth__input" 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />

            <label className="field-label" htmlFor="password">
              mot de passe
            </label>
            <input 
              className="field-input auth__input" 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />

            <label className="field-label" htmlFor="confirm">
              confirmez votre mot de passe
            </label>
            <input 
              className="field-input auth__input" 
              id="confirm" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />

            <button 
              type="submit" 
              className="btn btn-red auth__submit"
              disabled={loading}
            >
              {loading ? "Création en cours..." : "créer mon compte"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}