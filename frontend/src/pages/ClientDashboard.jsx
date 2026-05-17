import { useEffect, useMemo, useState } from "react";
import spa from "../assets/spa.png";
import { getMyAppointments } from "../services/appointmentService";

const recommandations = [
  { nom: "Rituel Oxygene Pur", detail: "Base sur votre dernier soin" },
  { nom: "Massage pierres chaudes", detail: "Ideal pour une pause profonde" },
];

const historiqueDemo = [
  { date: "12 Sep 2026", soin: "Manucure russe", praticien: "Amandine", prix: "65 $" },
  { date: "28 Aout 2026", soin: "Drainage lymphatique", praticien: "Julia", prix: "150 $" },
  { date: "05 Aout 2026", soin: "Peeling glycolique", praticien: "Sophia", prix: "120 $" },
];

function ClientDashboard({ utilisateur, setPage }) {
  const [rendezVous, setRendezVous] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    getMyAppointments().then(setRendezVous).catch((error) => setErreur(error.message));
  }, []);

  const prochain = useMemo(() => rendezVous[0], [rendezVous]);
  const historique = rendezVous.length
    ? rendezVous.slice(0, 3).map((rdv) => ({
        date: rdv.date,
        soin: rdv.service?.nom || "Soin FMC Style",
        praticien: rdv.employe?.utilisateur?.nom || "Equipe FMC Style",
        prix: `${Number(rdv.service?.prix || 0).toFixed(0)} $`,
      }))
    : historiqueDemo;

  return (
    <div className="client-page">
      <header className="client-heading">
        <p className="eyebrow">Tableau de bord</p>
        <h1>Bonjour, {utilisateur?.nom || "cliente FMC Style"}</h1>
        <p>Bienvenue dans votre espace personnel. Retrouvez vos rendez-vous et votre parcours beaute.</p>
        <div className="client-heading-actions">
          <button className="btn-primary" type="button" onClick={() => setPage("booking")}>
            Nouveau rendez-vous
          </button>
          <button className="btn-light" type="button" onClick={() => setPage("chat")}>
            Discuter avec l'assistant
          </button>
        </div>
      </header>

      {erreur && <p className="error">{erreur}</p>}

      <section className="client-dashboard-grid">
        <article className="client-card client-next-card">
          <div className="client-card-kicker">Votre prochain instant</div>
          <div className="client-card-title-row">
            <h2>Mes prochains rendez-vous</h2>
            <div className="client-arrows">
              <button type="button">&lt;</button>
              <button type="button">&gt;</button>
            </div>
          </div>
          <div className="client-appointment-image">
            <img src={spa} alt="Salle de soin FMC Style" />
            <div>
              <span>Date</span>
              <strong>{prochain?.date || "A planifier"}</strong>
            </div>
            <div>
              <span>Heure</span>
              <strong>{prochain?.heure || "--:--"}</strong>
            </div>
          </div>
          <div className="client-next-footer">
            <div>
              <h3>{prochain?.service?.nom || "Aucun rendez-vous confirme"}</h3>
              <p>
                {prochain
                  ? `${prochain.employe?.utilisateur?.nom || "Equipe FMC Style"} - ${prochain.statut}`
                  : "Demarrez une reservation ou demandez conseil a l'assistant."}
              </p>
            </div>
            <div className="actions">
              <button className="btn-light" type="button" onClick={() => setPage("client-appointments")}>
                Voir
              </button>
              <button className="btn-dark" type="button" onClick={() => setPage("booking")}>
                Reserver
              </button>
            </div>
          </div>
        </article>

        <aside className="client-card client-recommendations">
          <div className="client-card-kicker">Recommande pour vous</div>
          <h2>Soins personnalises</h2>
          <div className="recommendation-list">
            {recommandations.map((item) => (
              <button type="button" key={item.nom} onClick={() => setPage("services")}>
                <span></span>
                <strong>{item.nom}</strong>
                <small>{item.detail}</small>
              </button>
            ))}
          </div>
          <button className="btn-light full" type="button" onClick={() => setPage("services")}>
            Voir tous les soins
          </button>
        </aside>
      </section>

      <section className="client-card client-history">
        <div className="client-history-header">
          <div>
            <div className="client-card-kicker">Votre parcours beaute</div>
            <h2>Historique des soins</h2>
          </div>
          <button className="client-search" type="button" onClick={() => setPage("client-history")}>
            Rechercher un soin...
          </button>
        </div>
        <div className="client-table">
          <div className="client-table-row head">
            <span>Date</span>
            <span>Soin</span>
            <span>Praticien</span>
            <span>Prix</span>
            <span>Action</span>
          </div>
          {historique.map((item) => (
            <div className="client-table-row" key={`${item.date}-${item.soin}`}>
              <span>{item.date}</span>
              <strong>{item.soin}</strong>
              <span>{item.praticien}</span>
              <span>{item.prix}</span>
              <button type="button">Recu</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ClientDashboard;
