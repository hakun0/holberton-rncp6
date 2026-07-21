import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Contact.css";

export default function Contact() {
  return (
    <>
      <Header />
      <main className="contact">
        <div className="container contact__inner">
          <div className="contact__intro">
            <span className="eyebrow">Une question ?</span>
            <h1 className="contact__title">Contacte-nous</h1>
            <p>
              Un bug sur une conversion, une idée d'amélioration, ou juste envie de dire bonjour :
              écris-nous, on répond sous 48h.
            </p>
            <div className="contact__info">
              <div>
                <span className="field-label">E-mail</span>
                <p>support@keynote-app.fr</p>
              </div>
              <div>
                <span className="field-label">Réseaux</span>
                <p>@keynoteapp</p>
              </div>
            </div>
          </div>

          <form className="contact__form card">
            <label className="field-label" htmlFor="c-name">
              Nom
            </label>
            <input className="field-input" id="c-name" type="text" placeholder="Ton nom" required />

            <label className="field-label" htmlFor="c-email">
              E-mail
            </label>
            <input className="field-input" id="c-email" type="email" placeholder="toi@exemple.com" required />

            <label className="field-label" htmlFor="c-message">
              Message
            </label>
            <textarea
              className="field-input contact__textarea"
              id="c-message"
              rows={5}
              placeholder="Décris ta demande…"
              required
            />

            <button type="submit" className="btn btn-primary contact__submit">
              Envoyer le message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
