import { useEffect, useState } from "react";
import { api } from "../services/api";
import { nomClient, statutRdv } from "./adminUtils";

function EmployeeAppointments() {
  const [rendezVous, setRendezVous] = useState([]);

  useEffect(() => {
    api.get("/employees/me/appointments").then(setRendezVous).catch(() => setRendezVous([]));
  }, []);

  return (
    <div className="admin-page employee-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Reservations attribuees</p>
        <h1>Rendez-vous</h1>
        <p>Liste complete des prestations qui vous sont assignees.</p>
      </header>
      <section className="admin-card admin-table-card">
        <div className="admin-table employee-appointments-table">
          <div className="admin-table-row head">
            <span>Client</span>
            <span>Service</span>
            <span>Date</span>
            <span>Heure</span>
            <span>Notes</span>
            <span>Statut</span>
          </div>
          {rendezVous.map((rdv) => (
            <div className="admin-table-row" key={rdv.id}>
              <strong>{nomClient(rdv)}</strong>
              <span>{rdv.service?.nom || "Service"}</span>
              <span>{rdv.date}</span>
              <span>{rdv.heure}</span>
              <span>{rdv.notes || "Aucune note"}</span>
              <span className={`admin-status ${rdv.statut}`}>{statutRdv[rdv.statut] || rdv.statut}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default EmployeeAppointments;
