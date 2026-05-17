import { useState } from "react";

const navItems = [
  { id: "services", label: "Services" },
  { id: "promotions", label: "Promotions" },
  { id: "blog", label: "Blog & Conseils" },
  { id: "about", label: "A propos" },
  { id: "chat", label: "Conciergerie" },
];

function Navbar({ page, setPage, utilisateur, deconnecter }) {
  const [ouvert, setOuvert] = useState(false);
  const espace =
    utilisateur?.role === "admin" ? "admin" : utilisateur?.role === "employee" || utilisateur?.role === "employe" ? "employee" : "client";
  const aller = (destination) => {
    setPage(destination);
    setOuvert(false);
  };

  return (
    <header className="navbar">
      <button className="brand" onClick={() => aller("home")}>
        FMC STYLE
      </button>

      <button className="nav-toggle" onClick={() => setOuvert((valeur) => !valeur)} aria-label="Ouvrir le menu">
        <span></span>
        <span></span>
      </button>

      <nav className={`nav-links ${ouvert ? "open" : ""}`}>
        {navItems.map((item) => (
          <button key={item.id} className={page === item.id ? "active" : ""} onClick={() => aller(item.id)}>
            {item.label}
          </button>
        ))}
        {utilisateur && (
          <button className={page === espace ? "active" : ""} onClick={() => aller(espace)}>
            Tableau de bord
          </button>
        )}
      </nav>

      <div className={`nav-actions ${ouvert ? "open" : ""}`}>
        {utilisateur ? (
          <>
            <button onClick={() => aller(espace)}>{utilisateur.nom}</button>
            <button onClick={deconnecter}>Deconnexion</button>
          </>
        ) : (
          <button onClick={() => aller("login")}>Connexion</button>
        )}
        <button className="btn-primary nav-reserve" onClick={() => aller(utilisateur ? "booking" : "login")}>
          Reserver
        </button>
      </div>
    </header>
  );
}

export default Navbar;
