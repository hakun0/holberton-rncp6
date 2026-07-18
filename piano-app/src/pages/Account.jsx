import Footer from "../components/Footer";
import "./Account.css";

export default function Account() {
  return (
    <>
      <main className="account">
        <div className="container account__inner">
          <div className="account__brand">
            <span className="account__brand-mark" aria-hidden="true">
              ♪
            </span>
            <h1 className="account__brand-title">MELO</h1>
          </div>

          <div className="account__identity">
            <span className="account__avatar" aria-hidden="true" />
            pseudo ou adresse mail
          </div>

          <button className="btn btn-cream account__action">modifier adresse mail</button>
          <button className="btn btn-cream account__action">modifier mot de passe</button>
          <button className="btn btn-red account__action account__action--danger">supprimer mon compte</button>
          <button className="btn btn-red account__action">Déconnexion</button>
        </div>
      </main>
      <Footer />
    </>
  );
}
