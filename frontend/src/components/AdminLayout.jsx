const adminItems = [
  { id: "admin", label: "Vue d'ensemble", icon: "01" },
  { id: "admin-appointments", label: "Rendez-vous", icon: "02" },
  { id: "admin-planning", label: "Planning", icon: "03" },
  { id: "admin-services", label: "Services", icon: "04" },
  { id: "admin-employees", label: "Employes", icon: "05" },
  { id: "admin-promotions", label: "Promotions", icon: "06" },
  { id: "admin-clients", label: "Clients", icon: "07" },
  { id: "admin-payments", label: "Paiements", icon: "08" },
  { id: "admin-notifications", label: "Notifications", icon: "09" },
  { id: "admin-reports", label: "Rapports & Analyses", icon: "10" },
  { id: "admin-settings", label: "Parametres", icon: "11" },
];

function AdminLayout({ page, setPage, utilisateur, deconnecter, children }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div>
          <button className="admin-brand" type="button" onClick={() => setPage("admin")}>
            FMC STYLE
          </button>
          <p>Suite de gestion</p>
        </div>

        <nav className="admin-nav" aria-label="Navigation admin">
          {adminItems.map((item) => (
            <button key={item.id} className={page === item.id ? "active" : ""} type="button" onClick={() => setPage(item.id)}>
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <button className="admin-new" type="button" onClick={() => setPage("booking")}>
            Nouveau RDV
          </button>
          <button type="button" onClick={() => setPage("admin-support")}>
            Support
          </button>
          <button type="button" onClick={deconnecter}>
            Deconnexion
          </button>
          <div className="admin-profile">
            <span>{(utilisateur?.nom || "A").slice(0, 1)}</span>
            <div>
              <strong>{utilisateur?.nom || "Administrateur"}</strong>
              <small>Gestionnaire du salon</small>
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main-shell">
        <header className="admin-topbar">
          <div>
            <span>FMC STYLE ADMIN</span>
            <strong>{utilisateur?.nom || "Administrateur"}</strong>
          </div>
          <button type="button" onClick={() => setPage("admin-notifications")}>
            Notifications
          </button>
        </header>
        <main className="admin-main">{children}</main>
        <footer className="admin-footer">(c) 2026 FMC STYLE - Suite de gestion</footer>
      </div>
    </div>
  );
}

export default AdminLayout;
