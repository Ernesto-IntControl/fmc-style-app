function AppointmentCard({ rendezVous }) {
  return (
    <article className="list-item">
      <strong>{rendezVous.heure}</strong>
      <div>
        <h3>{rendezVous.service?.nom || "Service"}</h3>
        <p>
          {rendezVous.date} · {rendezVous.employe?.utilisateur?.nom || "Equipe FMC Style"}
        </p>
      </div>
      <span className="badge">{rendezVous.statut}</span>
    </article>
  );
}

export default AppointmentCard;
