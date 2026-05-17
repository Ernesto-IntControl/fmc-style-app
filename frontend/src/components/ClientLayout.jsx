const menuPrincipal = [
  { id: "client", label: "Vue d'ensemble", icon: "01" },
  { id: "client-appointments", label: "Mes rendez-vous", icon: "02" },
  { id: "booking", label: "Nouveau rendez-vous", icon: "03" },
  { id: "chat", label: "Assistant virtuel", icon: "04" },
  { id: "client-inspirations", label: "Mes inspirations", icon: "05" },
  { id: "client-history", label: "Historique des soins", icon: "06" },
  { id: "client-profile", label: "Profil", icon: "07" },
];

function ClientLayout({ page, setPage, utilisateur, deconnecter, children }) {
  const aller = (destination) => setPage(destination);

  return (
    <div className="client-shell-layout">
      <aside className="client-sidebar">
        <div>
          <button className="client-brand" onClick={() => aller("client")}>
            FMC STYLE
          </button>
          <p className="client-subtitle">Espace client</p>
        </div>

        <nav className="client-nav" aria-label="Navigation espace client">
          {menuPrincipal.map((item) => (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              type="button"
              onClick={() => aller(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="client-sidebar-bottom">
          <button className="client-cta" type="button" onClick={() => aller("booking")}>
            Nouveau rendez-vous
          </button>
          <button type="button" onClick={() => aller("client-support")}>
            Support
          </button>
          <button type="button" onClick={deconnecter}>
            Deconnexion
          </button>
          <small>{utilisateur?.nom || "Client FMC Style"}</small>
        </div>
      </aside>

      <div className="client-main-shell">
        <main className="client-main">{children}</main>
        <footer className="client-footer">
          <nav>
            <button type="button">Politique de confidentialite</button>
            <button type="button">Conditions d'utilisation</button>
            <button type="button">Rapport de durabilite</button>
            <button type="button">Carrieres</button>
          </nav>
          <strong>FMC STYLE</strong>
          <small>(c) 2026 FMC STYLE. Une experience de minimalisme moderne.</small>
        </footer>
      </div>
    </div>
  );
}

export default ClientLayout;
