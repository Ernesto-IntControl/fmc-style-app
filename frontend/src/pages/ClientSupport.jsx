function ClientSupport({ setPage }) {
  return (
    <div className="client-page">
      <header className="client-heading compact">
        <p className="eyebrow">Assistance</p>
        <h1>Support</h1>
        <p>Une question sur une reservation, un paiement ou une inspiration envoyee ? La conciergerie vous aide.</p>
      </header>

      <section className="client-support-grid">
        <article className="client-card">
          <h2>Contacter la conciergerie</h2>
          <p>Utilisez l'assistant virtuel pour obtenir une reponse rapide ou preparer une nouvelle demande.</p>
          <button className="btn-primary" type="button" onClick={() => setPage("chat")}>
            Ouvrir l'assistant
          </button>
        </article>
        <article className="client-card">
          <h2>Modifier un rendez-vous</h2>
          <p>Retrouvez vos reservations et contactez le salon si l'horaire doit changer.</p>
          <button className="btn-light" type="button" onClick={() => setPage("client-appointments")}>
            Voir mes rendez-vous
          </button>
        </article>
      </section>
    </div>
  );
}

export default ClientSupport;
