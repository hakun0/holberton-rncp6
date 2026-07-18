import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "./Auth.css";

export default function Login() {
  return (
    <>
      <main className="auth">
        <div className="container auth__inner">
          <form className="auth__card card">
            <div className="auth__brand">
              <span className="auth__brand-mark" aria-hidden="true">
                ♪
              </span>
              <h1 className="auth__brand-title">MELO</h1>
            </div>

            <p className="auth__intro">
              Connecte-toi. Si tu n'as pas de compte, <Link to="/inscription">crée un compte</Link>.
            </p>

            <label className="field-label" htmlFor="email">
              adresse mail
            </label>
            <input className="field-input auth__input" id="email" type="email" required />

            <label className="field-label" htmlFor="password">
              mot de passe
            </label>
            <input className="field-input auth__input" id="password" type="password" required />

            <button type="submit" className="btn btn-red auth__submit">
              se connecter
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
