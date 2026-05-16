import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { api } from "../services/api";

function EmployeePlanning({ utilisateur, setPage }) {
  const [rendezVous, setRendezVous] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    api
      .get("/employees/me/appointments")
      .then((rdv) => setRendezVous(rdv))
      .catch((error) => setErreur(error.message));
  }, [utilisateur]);

  return (
    <section className="dashboard-layout">
      <aside className="sidebar">
        <h2>FMC STYLE</h2>
        <button>Planning du jour</button>
        <button onClick={() => setPage("services")}>Services</button>
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-title">
          <p className="eyebrow">Interface employe</p>
          <h1>Bonjour, {utilisateur?.nom}</h1>
          <p>Planning adapte tablette avec les rendez-vous attribues.</p>
        </div>
        {erreur && <p className="error">{erreur}</p>}
        <div className="list">
          {rendezVous.map((rdv) => (
            <AppointmentCard key={rdv.id} rendezVous={rdv} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EmployeePlanning;
