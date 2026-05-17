const employeeItems = [
  { id: "employee", label: "Mon planning", icon: "01" },
  { id: "employee-appointments", label: "Rendez-vous", icon: "02" },
  { id: "employee-clients", label: "Clients du jour", icon: "03" },
  { id: "employee-inspirations", label: "Inspirations", icon: "04" },
  { id: "employee-profile", label: "Profil", icon: "05" },
];

function EmployeeLayout({ page, setPage, utilisateur, deconnecter, children }) {
  return (
    <div className="employee-layout">
      <aside className="employee-sidebar">
        <div>
          <button className="admin-brand" type="button" onClick={() => setPage("employee")}>
            FMC STYLE
          </button>
          <p>Espace employe</p>
        </div>
        <nav className="admin-nav" aria-label="Navigation employe">
          {employeeItems.map((item) => (
            <button key={item.id} className={page === item.id ? "active" : ""} type="button" onClick={() => setPage(item.id)}>
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <button type="button" onClick={() => setPage("employee-support")}>
            Support
          </button>
          <button type="button" onClick={deconnecter}>
            Deconnexion
          </button>
          <div className="admin-profile">
            <span>{(utilisateur?.nom || "E").slice(0, 1)}</span>
            <div>
              <strong>{utilisateur?.nom || "Employe"}</strong>
              <small>Equipe FMC STYLE</small>
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main-shell">
        <header className="admin-topbar">
          <div>
            <span>FMC STYLE EMPLOYE</span>
            <strong>{utilisateur?.nom || "Employe"}</strong>
          </div>
          <button type="button" onClick={() => setPage("employee-appointments")}>
            Voir mes rendez-vous
          </button>
        </header>
        <main className="admin-main">{children}</main>
        <footer className="admin-footer">(c) 2026 FMC STYLE - Espace employe</footer>
      </div>
    </div>
  );
}

export default EmployeeLayout;
