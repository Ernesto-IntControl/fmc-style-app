import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { getMyAppointments } from "../services/appointmentService";

function ClientDashboard({ utilisateur, setPage }) {
  const [rendezVous, setRendezVous] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    getMyAppointments().then(setRendezVous).catch((error) => setErreur(error.message));
  }, []);

  return (
    <section className="dashboard-layout">
      <aside className="sidebar">
        <h2>FMC STYLE</h2>
        <button onClick={() => setPage("booking")}>Nouveau rendez-vous</button>
        <button onClick={() => setPage("chat")}>Assistant</button>
        <button onClick={() => setPage("services")}>Services</button>
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-title">
          <p className="eyebrow">Espace client</p>
          <h1>Bonjour, {utilisateur?.nom}</h1>
          <p>Retrouvez vos reservations et votre parcours beaute.</p>
        </div>
        {erreur && <p className="error">{erreur}</p>}
        <div className="stats">
          <div className="dashboard-card">
            Rendez-vous
            <strong>{rendezVous.length}</strong>
          </div>
          <div className="dashboard-card">
            Confirmes
            <strong>{rendezVous.filter((rdv) => rdv.statut === "confirme").length}</strong>
          </div>
          <div className="dashboard-card">
            En attente
            <strong>{rendezVous.filter((rdv) => rdv.statut === "en_attente").length}</strong>
          </div>
        </div>
        <div className="list">
          {rendezVous.map((rdv) => (
            <AppointmentCard key={rdv.id} rendezVous={rdv} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientDashboard;
