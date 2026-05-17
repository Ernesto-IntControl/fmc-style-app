function EmployeeProfile({ utilisateur }) {
  return (
    <div className="admin-page employee-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Compte employe</p>
        <h1>Profil</h1>
        <p>Informations de contact et role dans l'equipe FMC STYLE.</p>
      </header>
      <section className="admin-card profile-card">
        <div className="detail-grid">
          <div>
            <span>Nom</span>
            <strong>{utilisateur?.nom || "Employe"}</strong>
          </div>
          <div>
            <span>Email</span>
            <strong>{utilisateur?.email || "email non renseigne"}</strong>
          </div>
          <div>
            <span>Telephone</span>
            <strong>{utilisateur?.telephone || "telephone non renseigne"}</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>Employe du salon</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EmployeeProfile;
