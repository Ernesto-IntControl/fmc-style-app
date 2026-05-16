import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { api } from "../services/api";
import { getAllAppointments } from "../services/appointmentService";

function AdminDashboard({ utilisateur, setPage }) {
  const [rendezVous, setRendezVous] = useState([]);
  const [services, setServices] = useState([]);
  const [employes, setEmployes] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    Promise.all([getAllAppointments(), api.get("/services"), api.get("/employees")])
      .then(([rdv, listeServices, listeEmployes]) => {
        setRendezVous(rdv);
        setServices(listeServices);
        setEmployes(listeEmployes);
      })
      .catch((error) => setErreur(error.message));
  }, []);

  return (
    <section className="dashboard-layout">
      <aside className="sidebar">
        <h2>FMC STYLE ADMIN</h2>
        <button>Vue d'ensemble</button>
        <button>Services</button>
        <button>Employes</button>
        <button>Promotions</button>
        <button onClick={() => setPage("booking")}>Nouveau RDV</button>
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-title">
          <p className="eyebrow">Gestionnaire de salon</p>
          <h1>Bonjour, {utilisateur?.nom}</h1>
          <p>Voici ce qui se passe au salon aujourd'hui.</p>
        </div>
        {erreur && <p className="error">{erreur}</p>}
        <div className="stats">
          <div className="dashboard-card">
            Rendez-vous
            <strong>{rendezVous.length}</strong>
          </div>
          <div className="dashboard-card">
            Services
            <strong>{services.length}</strong>
          </div>
          <div className="dashboard-card">
            Employes
            <strong>{employes.length}</strong>
          </div>
        </div>
        <h2>Planning global</h2>
        <div className="list">
          {rendezVous.map((rdv) => (
            <AppointmentCard key={rdv.id} rendezVous={rdv} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
