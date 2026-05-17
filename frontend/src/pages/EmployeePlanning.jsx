import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { dateAujourdhui, nomClient, statutRdv } from "./adminUtils";

function EmployeePlanning({ utilisateur, setPage }) {
  const [rendezVous, setRendezVous] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    api
      .get("/employees/me/appointments")
      .then(setRendezVous)
      .catch((error) => setErreur(error.message));
  }, []);

  const aujourdhui = dateAujourdhui();
  const rdvJour = useMemo(() => rendezVous.filter((rdv) => rdv.date === aujourdhui), [rendezVous, aujourdhui]);
  const prochains = rdvJour.length ? rdvJour : rendezVous.slice(0, 4);
  const inspirations = rendezVous.reduce((total, rdv) => total + (Array.isArray(rdv.imagesInspiration) ? rdv.imagesInspiration.length : 0), 0);

  return (
    <div className="admin-page employee-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Planning du jour</p>
        <h1>Bonjour, {utilisateur?.nom || "employe"}</h1>
        <p>Retrouvez vos prochains clients, leurs notes et les inspirations envoyees avant le rendez-vous.</p>
      </header>
      {erreur && <p className="error">{erreur}</p>}

      <section className="admin-kpi-grid compact">
        <article className="admin-card kpi-card">
          <span>Rendez-vous aujourd'hui</span>
          <strong>{rdvJour.length}</strong>
        </article>
        <article className="admin-card kpi-card">
          <span>Prochains clients</span>
          <strong>{prochains.length}</strong>
        </article>
        <article className="admin-card kpi-card">
          <span>Photos inspiration</span>
          <strong>{inspirations}</strong>
        </article>
      </section>

      <section className="employee-grid">
        <article className="admin-card">
          <div className="admin-section-title">
            <h2>Prochains clients</h2>
            <button type="button" onClick={() => setPage("employee-appointments")}>
              Tout voir
            </button>
          </div>
          <div className="admin-timeline">
            {prochains.map((rdv) => (
              <div className="admin-timeline-row" key={rdv.id}>
                <div>
                  <strong>{rdv.heure}</strong>
                  <span>{rdv.date}</span>
                </div>
                <div>
                  <h3>{rdv.service?.nom || "Service FMC STYLE"}</h3>
                  <p>{nomClient(rdv)}</p>
                </div>
                <span className={`admin-status ${rdv.statut}`}>{statutRdv[rdv.statut] || rdv.statut}</span>
              </div>
            ))}
          </div>
        </article>

        <aside className="admin-card">
          <div className="admin-section-title">
            <h2>Notes clients</h2>
          </div>
          {prochains.slice(0, 3).map((rdv) => (
            <div className="note-block" key={rdv.id}>
              <strong>{nomClient(rdv)}</strong>
              <p>{rdv.notes || "Aucune note particuliere."}</p>
              <small>{Array.isArray(rdv.imagesInspiration) ? rdv.imagesInspiration.length : 0} inspiration(s)</small>
            </div>
          ))}
        </aside>
      </section>
    </div>
  );
}

export default EmployeePlanning;
