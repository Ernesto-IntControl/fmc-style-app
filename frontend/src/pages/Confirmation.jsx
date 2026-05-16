function Confirmation({ reservation, setPage }) {
  return (
    <section className="page-hero">
      <p className="eyebrow">Confirmation</p>
      <h1>Votre rendez-vous est confirme</h1>
      <p>
        Paiement simule effectue. L'admin et l'employe peuvent maintenant voir le rendez-vous dans leurs espaces.
      </p>
      <div className="actions" style={{ justifyContent: "center" }}>
        <button className="btn-primary" onClick={() => setPage("client")}>
          Voir mon espace
        </button>
        <button className="btn-secondary" onClick={() => setPage("services")}>
          Retour aux services
        </button>
      </div>
      {reservation?.rendezVous && (
        <div className="summary-card" style={{ maxWidth: 620, margin: "40px auto 0", textAlign: "left" }}>
          <div className="summary-row">
            <span>Date</span>
            <strong>{reservation.rendezVous.date}</strong>
          </div>
          <div className="summary-row">
            <span>Heure</span>
            <strong>{reservation.rendezVous.heure}</strong>
          </div>
        </div>
      )}
    </section>
  );
}

export default Confirmation;
