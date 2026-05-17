import { useEffect, useState } from "react";
import { getMyAppointments } from "../services/appointmentService";

const statutLabels = {
  en_attente: "En attente",
  pending: "En attente",
  confirme: "Confirme",
  confirmed: "Confirme",
  annule: "Annule",
  cancelled: "Annule",
  termine: "Termine",
  completed: "Termine",
};

function ClientAppointments({ setPage }) {
  const [rendezVous, setRendezVous] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    getMyAppointments().then(setRendezVous).catch((error) => setErreur(error.message));
  }, []);

  return (
    <div className="client-page">
      <header className="client-heading compact">
        <p className="eyebrow">Planning personnel</p>
        <h1>Mes rendez-vous</h1>
        <p>Suivez les rendez-vous en attente, confirmes, annules ou termines.</p>
      </header>

      {erreur && <p className="error">{erreur}</p>}

      <section className="client-card">
        <div className="client-list-header">
          <h2>Reservations</h2>
          <button className="btn-primary" type="button" onClick={() => setPage("booking")}>
            Nouveau rendez-vous
          </button>
        </div>
        <div className="appointment-list">
          {rendezVous.length === 0 && (
            <div className="empty-state">
              <h3>Aucun rendez-vous pour le moment</h3>
              <p>Demarrez une nouvelle reservation ou demandez conseil a la conciergerie.</p>
            </div>
          )}
          {rendezVous.map((rdv) => (
            <article className="appointment-row" key={rdv.id}>
              <div>
                <span>{rdv.date}</span>
                <strong>{rdv.heure}</strong>
              </div>
              <div>
                <h3>{rdv.service?.nom || "Service FMC Style"}</h3>
                <p>{rdv.employe?.utilisateur?.nom || "Equipe FMC Style"}</p>
              </div>
              <span className="status-pill">{statutLabels[rdv.statut] || rdv.statut}</span>
              <div className="appointment-actions">
                <button type="button">Voir detail</button>
                <button type="button" disabled={rdv.statut === "annule" || rdv.statut === "cancelled"}>
                  Annuler
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ClientAppointments;
