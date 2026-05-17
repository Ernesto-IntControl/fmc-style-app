import reception from "../assets/reception.png";

function Confirmation({ reservation, setPage, utilisateur }) {
  return (
    <div className="confirmation-page">
      <section className="confirmation-hero">
        <div className="success-icon">✓</div>
        <h1>Rendez-vous confirme !</h1>
        <p>Un email de confirmation vous a ete envoye. Nous avons hate de vous accueillir chez FMC STYLE.</p>
      </section>

      <section className="confirmation-card">
        <img src={reception} alt="Salon FMC Style" />
        <div>
          <p className="eyebrow">Service selectionne</p>
          <h2>{reservation?.service?.nom || "Rituel FMC Style"}</h2>
          <div className="confirmation-details">
            <span>Date</span>
            <strong>{reservation?.rendezVous?.date || "A confirmer"}</strong>
            <span>Heure</span>
            <strong>{reservation?.rendezVous?.heure || "--:--"}</strong>
            <span>Statut</span>
            <strong>Confirme</strong>
          </div>
          <div className="confirmation-actions">
            {utilisateur && (
              <button className="btn-light" type="button" onClick={() => setPage("client-appointments")}>
                Voir mes rendez-vous
              </button>
            )}
            <button className="btn-primary" type="button" onClick={() => setPage("home")}>
              Retour a l'accueil
            </button>
          </div>
        </div>
      </section>

      <section className="location-card">
        <div>
          <p className="eyebrow">Notre emplacement</p>
          <h2>Notre sanctuaire</h2>
          <p>
            Situe au coeur de la ville, FMC STYLE est un espace calme et confidentiel. Pour garantir la qualite de votre
            accueil, veuillez vous presenter dix minutes avant le debut du soin.
          </p>
        </div>
        <div className="map-placeholder">
          <span>FMC STYLE</span>
        </div>
      </section>
    </div>
  );
}

export default Confirmation;
