import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Loading.css";
import "./Home.css";

const STEPS = [
  {
    label: "Colle le lien",
    text: "Copie l'URL d'une vidéo YouTube de 4 minutes maximum et colle-la ci-dessus.",
  },
  {
    label: "On extrait la mélodie",
    text: "Notre algorithme isole la ligne mélodique principale, peu importe l'instrument d'origine.",
  },
  {
    label: "Reçois ta partition",
    text: "Les notes sont réattribuées au piano et affichées en défilement façon Synthesia.",
  },
];

export default function Loading() {
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.state?.url ?? "";
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (tick >= 2) {
      const finish = setTimeout(() => navigate("/resultat"), 1200);
      return () => clearTimeout(finish);
    }
    const t = setTimeout(() => setTick((i) => i + 1), 1200);
    return () => clearTimeout(t);
  }, [tick, navigate]);

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="container hero__inner">
            <h1 className="hero__title">
              De YouTube à la <span className="hero__title-accent">partition de piano</span>
              <br />
              en quelques secondes.
            </h1>
            <p className="hero__subtitle">
              Collez un lien YouTube, notre site transcrit la musique et génère une partition lisible prête à
              jouer.
            </p>

            <div className="hero__piano" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="hero__key hero__key--white" />
              ))}
              <div className="hero__black-keys">
                {[0, 1, 3, 4, 5, 7, 8, 10, 11, 12].map((pos) => (
                  <span key={pos} className="hero__key hero__key--black" style={{ left: `${pos * 7.14 + 4.5}%` }} />
                ))}
              </div>
            </div>

            <form className="hero__form card" onSubmit={(e) => e.preventDefault()}>
              <label className="hero__form-label" htmlFor="yt-url">
                LIEN YOUTUBE :
              </label>
              <div className="hero__form-row">
                <input id="yt-url" type="url" className="field-input hero__input" defaultValue={url} readOnly />
                <button type="submit" className="btn btn-primary hero__submit" disabled>
                  convertir
                </button>
              </div>
            </form>

            <div className="loading__panel card">
              <span className="loading__spinner" aria-hidden="true" />
              <p>Analyse en cours…</p>
            </div>
          </div>
        </section>

        <div className="hero__divider" />

        <section className="how">
          <div className="container">
            <h2 className="how__title">Comment ça marche</h2>
            <div className="how__grid">
              {STEPS.map((step, i) => (
                <div className="how__card card" key={step.label}>
                  <span className="how__index">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="how__label">{step.label}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
