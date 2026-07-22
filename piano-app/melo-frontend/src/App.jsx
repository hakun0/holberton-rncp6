import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // 👈 Uniquement ici

import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Result from "./pages/Result";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
      <Header /> {/* 👈 Un seul Header global ici */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chargement" element={<Loading />} />
        <Route path="/resultat" element={<Result />} />
        <Route path="/historique" element={<History />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Signup />} />
        <Route path="/compte" element={<Account />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
