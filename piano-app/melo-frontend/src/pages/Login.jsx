import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 🚀 ENVOI DES IDENTIFIANTS VERS FASTAPI
      // FastAPI OAuth2 utilise généralement du x-www-form-urlencoded avec 'username'
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Email ou mot de passe incorrect.");
      }

      // 🎯 SAUVEGARDE DANS LE NAVIGATEUR
      localStorage.setItem("userToken", data.access_token);
      localStorage.setItem("userEmail", email);

      // 🔄 REDIRECTION VERS L'ACCUEIL
      navigate("/");

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
              Connecte-toi. Si tu n'as pas de compte,{" "}
              <Link to="/inscription">crée un compte</Link>.
            </p>

            {/* Message d'erreur s'il y en a un */}
            {error && (
              <div
                style={{
                  color: "#ff4d4d",
                  marginBottom: "1rem",
                  textAlign: "center",
                  fontSize: "0.9rem",
                }}
              >
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

            <button
              type="submit"
              className="btn btn-red auth__submit"
              disabled={loading}
            >
              {loading ? "Connexion..." : "se connecter"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
