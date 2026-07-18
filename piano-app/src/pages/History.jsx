import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./History.css";

const INITIAL_ITEMS = [
  { title: "Clair de Lune", artist: "Claude Debussy", album: "Suite bergamasque" },
  { title: "River Flows in You", artist: "Yiruma", album: "First Love" },
  { title: "Comptine d'un autre été", artist: "Yann Tiersen", album: "Amélie" },
];

export default function History() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

  function handleDelete(title) {
    setItems((prev) => prev.filter((item) => item.title !== title));
  }

  return (
    <>
      <Header loggedIn secondaryLink="accueil" />
      <main className="history">
        <div className="container">
          <div className="history__search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="recherche dans l'historique"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Recherche dans l'historique"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="history__empty card">
              <p>Aucune conversion trouvée. Colle un lien YouTube depuis l'accueil pour commencer.</p>
            </div>
          ) : (
            <ul className="history__list">
              {filtered.map((item, i) => (
                <li className="history__item" key={item.title}>
                  <span className="history__index">{i + 1}</span>
                  <span className="history__cover">cover
of song</span>
                  <div className="history__info">
                    <strong>{item.title}</strong>
                    <span>{item.artist}</span>
                    <span>{item.album}</span>
                  </div>
                  <button className="btn btn-cream history__delete" onClick={() => handleDelete(item.title)}>
                    Delete 🗑
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
