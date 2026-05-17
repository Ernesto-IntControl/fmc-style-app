function EmployeeSupport({ setPage }) {
  return (
    <div className="admin-page employee-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Assistance employe</p>
        <h1>Support</h1>
        <p>Retrouvez rapidement vos rendez-vous, clients et inspirations.</p>
      </header>
      <section className="client-support-grid">
        <article className="admin-card">
          <h2>Besoin de verifier un client ?</h2>
          <p>Consultez la liste des clients attribues et leurs notes importantes.</p>
          <button className="btn-primary" type="button" onClick={() => setPage("employee-clients")}>
            Clients du jour
          </button>
        </article>
        <article className="admin-card">
          <h2>Besoin d'une reference ?</h2>
          <p>Ouvrez la galerie des inspirations liees a vos prochains rendez-vous.</p>
          <button className="btn-light" type="button" onClick={() => setPage("employee-inspirations")}>
            Inspirations
          </button>
        </article>
      </section>
    </div>
  );
}

export default EmployeeSupport;
