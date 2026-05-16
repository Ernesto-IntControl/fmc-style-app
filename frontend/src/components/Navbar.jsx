const navItems = [
  { id: "home", label: "Accueil" },
  { id: "services", label: "Services" },
  { id: "chat", label: "Conciergerie" },
];

function Navbar({ page, setPage, utilisateur, deconnecter }) {
  const espace = utilisateur?.role === "admin" ? "admin" : utilisateur?.role === "employe" ? "employee" : "client";

  return (
    <header className="navbar">
      <button className="brand" onClick={() => setPage("home")}>
        FMC STYLE
      </button>

      <nav className="nav-links">
        {navItems.map((item) => (
          <button key={item.id} className={page === item.id ? "active" : ""} onClick={() => setPage(item.id)}>
            {item.label}
          </button>
        ))}
        {utilisateur && (
          <button className={page === espace ? "active" : ""} onClick={() => setPage(espace)}>
            Tableau de bord
          </button>
        )}
      </nav>

      <div className="nav-actions">
        {utilisateur ? (
          <>
            <button onClick={() => setPage(espace)}>{utilisateur.nom}</button>
            <button onClick={deconnecter}>Deconnexion</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>Connexion</button>
        )}
        <button className="btn-primary" onClick={() => setPage(utilisateur ? "booking" : "login")}>
          Reserver
        </button>
      </div>
    </header>
  );
}

export default Navbar;
