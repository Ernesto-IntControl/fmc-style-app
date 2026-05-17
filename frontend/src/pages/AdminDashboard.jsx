import { useEffect, useMemo, useState } from "react";
import { getAdminData, updateAppointmentStatus } from "../services/adminService";
import { dateAujourdhui, extraireClients, formatPrix, nomClient, nomEmploye, statutRdv } from "./adminUtils";

function AdminDashboard({ utilisateur, setPage }) {
  const [donnees, setDonnees] = useState({
    rendezVous: [],
    services: [],
    employes: [],
    promotions: [],
    paiements: [],
  });
  const [erreur, setErreur] = useState("");

  const charger = () => {
    getAdminData().then(setDonnees).catch((error) => setErreur(error.message));
  };

  useEffect(() => {
    charger();
  }, []);

  const stats = useMemo(() => {
    const jour = dateAujourdhui();
    const rdvJour = donnees.rendezVous.filter((rdv) => rdv.date === jour);
    const revenus = donnees.paiements
      .filter((paiement) => paiement.statut === "complete")
      .reduce((total, paiement) => total + Number(paiement.montantFinal || paiement.montant || 0), 0);
    const clients = extraireClients(donnees.rendezVous);
    const confirmes = donnees.rendezVous.filter((rdv) => rdv.statut === "confirme" || rdv.statut === "termine").length;
    const taux = donnees.rendezVous.length ? Math.round((confirmes / donnees.rendezVous.length) * 100) : 0;
    const promotionsActives = donnees.promotions.filter((promotion) => promotion.estActive).length;
    return { rdvJour: rdvJour.length, revenus, clients: clients.length, taux, promotionsActives };
  }, [donnees]);

  const changerStatut = async (id, statut) => {
    await updateAppointmentStatus(id, { statut });
    charger();
  };

  const prochains = donnees.rendezVous.slice(0, 4);
  const enAttente = donnees.rendezVous.filter((rdv) => rdv.statut === "en_attente").slice(0, 3);
  const paiementsRecents = donnees.paiements.slice(0, 3);

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Gestionnaire de salon</p>
        <h1>Bonjour, {utilisateur?.nom || "administrateur"}</h1>
        <p>Vue d'ensemble des reservations, revenus, equipes et alertes operationnelles du salon.</p>
      </header>

      {erreur && <p className="error">{erreur}</p>}

      <section className="admin-kpi-grid">
        <article className="admin-card kpi-card">
          <span>Rendez-vous du jour</span>
          <strong>{stats.rdvJour}</strong>
        </article>
        <article className="admin-card kpi-card">
          <span>Revenus semaine</span>
          <strong>{formatPrix(stats.revenus)}</strong>
        </article>
        <article className="admin-card kpi-card">
          <span>Nouveaux clients</span>
          <strong>{stats.clients}</strong>
        </article>
        <article className="admin-card kpi-card">
          <span>Taux reservation</span>
          <strong>{stats.taux}%</strong>
        </article>
        <article className="admin-card kpi-card">
          <span>Promotions actives</span>
          <strong>{stats.promotionsActives}</strong>
        </article>
      </section>

      <section className="admin-dashboard-grid">
        <article className="admin-card admin-panel-main">
          <div className="admin-section-title">
            <h2>Planning a venir</h2>
            <button type="button" onClick={() => setPage("admin-planning")}>
              Voir le planning
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
                  <h3>{rdv.service?.nom || "Service"}</h3>
                  <p>
                    Client : {nomClient(rdv)} - Employe : {nomEmploye(rdv)}
                  </p>
                </div>
                <span className={`admin-status ${rdv.statut}`}>{statutRdv[rdv.statut] || rdv.statut}</span>
              </div>
            ))}
          </div>
        </article>

        <aside className="admin-card">
          <div className="admin-section-title">
            <h2>Activite recente</h2>
          </div>
          <div className="admin-activity-list">
            {paiementsRecents.map((paiement) => (
              <div key={paiement.id}>
                <span>Paiement recu</span>
                <strong>{formatPrix(paiement.montantFinal)}</strong>
                <small>{paiement.rendezVous?.client?.nom || "Client FMC STYLE"}</small>
              </div>
            ))}
            <div>
              <span>Services actifs</span>
              <strong>{donnees.services.filter((service) => service.estActif).length}</strong>
              <small>Catalogue disponible en ligne</small>
            </div>
          </div>
        </aside>
      </section>

      <section className="admin-dashboard-grid lower">
        <article className="admin-card">
          <div className="admin-section-title">
            <h2>Rendez-vous en attente</h2>
            <button type="button" onClick={() => setPage("admin-appointments")}>
              Traiter
            </button>
          </div>
          <div className="pending-grid">
            {enAttente.map((rdv) => (
              <article key={rdv.id}>
                <span>
                  {rdv.date} - {rdv.heure}
                </span>
                <h3>{rdv.service?.nom || "Service FMC STYLE"}</h3>
                <p>{nomClient(rdv)}</p>
                <div>
                  <button type="button" onClick={() => changerStatut(rdv.id, "confirme")}>
                    Accepter
                  </button>
                  <button type="button" onClick={() => changerStatut(rdv.id, "annule")}>
                    Refuser
                  </button>
                </div>
              </article>
            ))}
            {!enAttente.length && <p>Aucun rendez-vous en attente pour le moment.</p>}
          </div>
        </article>

        <aside className="admin-card alert-card">
          <div className="admin-section-title">
            <h2>Alertes systeme</h2>
          </div>
          <ul>
            <li>Verifier les inspirations envoyees avant les soins complexes.</li>
            <li>{donnees.employes.filter((employe) => !employe.estActif).length} employe(s) marque(s) inactif(s).</li>
            <li>{donnees.promotions.filter((promotion) => promotion.estActive).length} campagne(s) a surveiller.</li>
          </ul>
        </aside>
      </section>
    </div>
  );
}

export default AdminDashboard;
