import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { extraireClients } from "./adminUtils";

function EmployeeClients() {
  const [rendezVous, setRendezVous] = useState([]);

  useEffect(() => {
    api.get("/employees/me/appointments").then(setRendezVous).catch(() => setRendezVous([]));
  }, []);

  const clients = useMemo(() => extraireClients(rendezVous), [rendezVous]);

  return (
    <div className="admin-page employee-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Preparation</p>
        <h1>Clients du jour</h1>
        <p>Informations utiles pour preparer les prestations et anticiper les besoins.</p>
      </header>
      <section className="inspiration-grid employee-client-grid">
        {clients.map((client) => (
          <article className="admin-card" key={client.id}>
            <h2>{client.nom}</h2>
            <p>{client.email}</p>
            <div className="mini-stats">
              <span>{client.visites} visite(s)</span>
              <span>{client.inspirations} inspiration(s)</span>
              <span>{client.telephone || "Telephone absent"}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default EmployeeClients;
