import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Result.css";
import "./Home.css";

const NOTES = [
  { pitch: 6, start: 0, len: 2 },
  { pitch: 4, start: 1, len: 1 },
  { pitch: 8, start: 2.5, len: 1.5 },
  { pitch: 3, start: 4, len: 1 },
  { pitch: 7, start: 5, len: 2 },
  { pitch: 5, start: 6.5, len: 1 },
  { pitch: 9, start: 7.5, len: 1.5 },
];

const POPULAR_SONGS = [
  { title: "Clair de Lune", artist: "Claude Debussy", album: "Suite bergamasque" },
  { title: "River Flows in You", artist: "Yiruma", album: "First Love" },
  { title: "Comptine d'un autre été", artist: "Yann Tiersen", album: "Amélie" },
];

export default function Result() {
  const [tab, setTab] = useState("apercu");
  const [format, setFormat] = useState("pdf");

  return (
    <>
      <Header loggedIn />
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
                <input id="yt-url" type="url" className="field-input hero__input" placeholder="https://youtube.com/watch?v=..." />
                <button type="submit" className="btn btn-primary hero__submit">
                  convertir
                </button>
              </div>
            </form>

            <div className="result__sheet card">
              <div className="result__sheet-head">
                <div>
                  <h2>Partition générée</h2>
                  <p className="result__sheet-sub">Für Elise — Beethoven</p>
                </div>
                <span className="result__badge">DÉBUTANT</span>
              </div>

              <div className="result__tabs">
                <button
                  className={"result__tab" + (tab === "apercu" ? " result__tab--active" : "")}
                  onClick={() => setTab("apercu")}
                >
                  ⊙ Aperçu
                </button>
                <button
                  className={"result__tab" + (tab === "modifier" ? " result__tab--active" : "")}
                  onClick={() => setTab("modifier")}
                >
                  ✎ Modifier
                </button>
                <span className="result__count">14 notes · 3 mesures</span>
              </div>

              <div className="result__roll">
                <div className="result__roll-grid">
                  {NOTES.map((n, i) => (
                    <div
                      key={i}
                      className="result__note"
                      style={{ left: `${n.start * 10}%`, width: `${n.len * 10}%`, bottom: `${n.pitch * 10}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="result__sheet-foot">
                <div className="result__formats">
                  <span>FORMAT</span>
                  {["pdf", "xml", "midi"].map((f) => (
                    <button
                      key={f}
                      className={"result__format" + (format === f ? " result__format--active" : "")}
                      onClick={() => setFormat(f)}
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="result__sheet-actions">
                  <button className="btn btn-secondary">⚙ Ajuster</button>
                  <button className="btn btn-primary">⬇ Télécharger .{format}</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="hero__divider" />

        <section className="popular">
          <div className="container">
            <h2 className="popular__title">Morceaux populaires</h2>
            <ul className="popular__list">
              {POPULAR_SONGS.map((song, i) => (
                <li className="popular__item" key={song.title}>
                  <span className="popular__index">{i + 1}</span>
                  <span className="popular__cover">cover
of song</span>
                  <div className="popular__info">
                    <strong>{song.title}</strong>
                    <span className="popular__artist">{song.artist}</span>
                    <span className="popular__album">{song.album}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
