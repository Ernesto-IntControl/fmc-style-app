import { useEffect, useState } from "react";
import { api } from "../services/api";
import spa from "../assets/spa.png";
import manucure from "../assets/manucure.png";

function EmployeeInspirations() {
  const [rendezVous, setRendezVous] = useState([]);

  useEffect(() => {
    api.get("/employees/me/appointments").then(setRendezVous).catch(() => setRendezVous([]));
  }, []);

  return (
    <div className="admin-page employee-page">
      <header className="admin-page-heading">
        <p className="eyebrow">References clients</p>
        <h1>Inspirations</h1>
        <p>Consultez les photos et notes envoyees pour preparer chaque style.</p>
      </header>
      <section className="inspiration-grid">
        {rendezVous.slice(0, 6).map((rdv, index) => (
          <article className="client-card inspiration-card" key={rdv.id}>
            <img src={index % 2 === 0 ? spa : manucure} alt={rdv.service?.nom || "Inspiration"} />
            <div>
              <h3>{rdv.service?.nom || "Service"}</h3>
              <p>{rdv.notes || "Aucune note client."}</p>
              <small>{Array.isArray(rdv.imagesInspiration) ? rdv.imagesInspiration.length : 0} fichier(s)</small>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default EmployeeInspirations;
