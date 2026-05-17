import { useEffect, useMemo, useState } from "react";
import { getAdminAppointments, updateAppointmentStatus } from "../services/adminService";
import { dateAujourdhui, nomClient, nomEmploye, statutRdv } from "./adminUtils";

const heures = ["09:00", "11:00", "14:00", "16:00"];

function AdminPlanning({ setPage }) {
  const [rendezVous, setRendezVous] = useState([]);
  const [mode, setMode] = useState("jour");
  const [date, setDate] = useState(dateAujourdhui());
  const [dragId, setDragId] = useState(null);

  useEffect(() => {
    getAdminAppointments().then(setRendezVous).catch(() => setRendezVous([]));
  }, []);

  const planning = useMemo(() => rendezVous.filter((rdv) => !date || rdv.date === date), [rendezVous, date]);

  const terminer = async (rdv) => {
    await updateAppointmentStatus(rdv.id, { statut: "termine", statutPaiement: rdv.statutPaiement });
    setRendezVous((actuels) => actuels.map((item) => (item.id === rdv.id ? { ...item, statut: "termine" } : item)));
  };

  const deplacerLocalement = (heure) => {
    if (!dragId) return;
    setRendezVous((actuels) => actuels.map((rdv) => (rdv.id === dragId ? { ...rdv, heure } : rdv)));
    setDragId(null);
  };

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Calendrier global</p>
        <h1>Planning</h1>
        <p>Visualisez les creneaux, la charge employe et les disponibilites par service.</p>
      </header>

      <section className="admin-card planning-controls">
        <div className="segmented">
          {["jour", "semaine", "mois"].map((item) => (
            <button key={item} className={mode === item ? "active" : ""} type="button" onClick={() => setMode(item)}>
              {item}
            </button>
          ))}
        </div>
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        <button className="btn-primary" type="button" onClick={() => setPage("booking")}>
          Creer un rendez-vous manuel
        </button>
      </section>

      <section className="planning-board">
        {heures.map((heure) => (
          <article className="admin-card planning-column" key={heure} onDragOver={(event) => event.preventDefault()} onDrop={() => deplacerLocalement(heure)}>
            <h2>{heure}</h2>
            <p>Creneau disponible</p>
            {planning
              .filter((rdv) => rdv.heure === heure)
              .map((rdv) => (
                <div className="planning-event" key={rdv.id} draggable onDragStart={() => setDragId(rdv.id)}>
                  <span className={`admin-status ${rdv.statut}`}>{statutRdv[rdv.statut] || rdv.statut}</span>
                  <h3>{rdv.service?.nom || "Service FMC STYLE"}</h3>
                  <p>{nomClient(rdv)}</p>
                  <small>{nomEmploye(rdv)}</small>
                  <button type="button" onClick={() => terminer(rdv)}>
                    Terminer
                  </button>
                </div>
              ))}
          </article>
        ))}
      </section>

      <section className="admin-card workload-card">
        <div className="admin-section-title">
          <h2>Surcharge employe</h2>
        </div>
        <div className="workload-grid">
          {Array.from(new Set(planning.map((rdv) => nomEmploye(rdv)))).map((nom) => {
            const total = planning.filter((rdv) => nomEmploye(rdv) === nom).length;
            return (
              <div key={nom}>
                <span>{nom}</span>
                <strong>{total} RDV</strong>
                <meter min="0" max="4" value={total}></meter>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default AdminPlanning;
