function AdminSupport({ setPage }) {
  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Assistance</p>
        <h1>Support</h1>
        <p>Accedez rapidement aux modules essentiels pour debloquer une operation du salon.</p>
      </header>
      <section className="client-support-grid">
        <article className="admin-card">
          <h2>Probleme de reservation</h2>
          <p>Controlez le statut, le paiement et l'employe assigne depuis la page rendez-vous.</p>
          <button className="btn-primary" type="button" onClick={() => setPage("admin-appointments")}>
            Voir les rendez-vous
          </button>
        </article>
        <article className="admin-card">
          <h2>Probleme de planning</h2>
          <p>Controlez les creneaux et les charges employes dans le calendrier admin.</p>
          <button className="btn-light" type="button" onClick={() => setPage("admin-planning")}>
            Ouvrir le planning
          </button>
        </article>
      </section>
    </div>
  );
}

export default AdminSupport;
