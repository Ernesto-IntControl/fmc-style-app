import { useEffect, useMemo, useState } from "react";
import { getAdminPayments } from "../services/adminService";
import { filtrerTexte, formatPrix, statutPaiement } from "./adminUtils";

function AdminPayments() {
  const [paiements, setPaiements] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [statut, setStatut] = useState("");

  useEffect(() => {
    getAdminPayments().then(setPaiements).catch(() => setPaiements([]));
  }, []);

  const liste = useMemo(() => {
    const parStatut = statut ? paiements.filter((paiement) => paiement.statut === statut) : paiements;
    return filtrerTexte(parStatut, recherche, [
      (paiement) => paiement.rendezVous?.client?.nom,
      (paiement) => paiement.rendezVous?.service?.nom,
      (paiement) => paiement.methode,
    ]);
  }, [paiements, recherche, statut]);

  const revenus = paiements.reduce((total, paiement) => total + Number(paiement.montantFinal || 0), 0);
  const revenusJour = paiements.slice(0, 3).reduce((total, paiement) => total + Number(paiement.montantFinal || 0), 0);
  const serviceTop = paiements[0]?.rendezVous?.service?.nom || "A definir";

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Module financier</p>
        <h1>Paiements</h1>
        <p>Suivez les revenus, statuts de paiement et services les plus rentables.</p>
      </header>

      <section className="admin-kpi-grid compact">
        <article className="admin-card kpi-card">
          <span>Revenus mensuels</span>
          <strong>{formatPrix(revenus)}</strong>
        </article>
        <article className="admin-card kpi-card">
          <span>Revenus journaliers</span>
          <strong>{formatPrix(revenusJour)}</strong>
        </article>
        <article className="admin-card kpi-card">
          <span>Service rentable</span>
          <strong>{serviceTop}</strong>
        </article>
      </section>

      <section className="admin-card admin-toolbar">
        <input value={recherche} onChange={(event) => setRecherche(event.target.value)} placeholder="Rechercher paiement..." />
        <select value={statut} onChange={(event) => setStatut(event.target.value)}>
          <option value="">Tous les statuts</option>
          <option value="complete">Paye</option>
          <option value="en_attente">En attente</option>
          <option value="echoue">Echoue</option>
        </select>
      </section>

      <section className="admin-card admin-table-card">
        <div className="admin-table payments-table">
          <div className="admin-table-row head">
            <span>Client</span>
            <span>Service</span>
            <span>Montant</span>
            <span>Methode</span>
            <span>Date</span>
            <span>Statut</span>
          </div>
          {liste.map((paiement) => (
            <div className="admin-table-row" key={paiement.id}>
              <strong>{paiement.rendezVous?.client?.nom || "Client"}</strong>
              <span>{paiement.rendezVous?.service?.nom || "Service"}</span>
              <span>{formatPrix(paiement.montantFinal)}</span>
              <span>{paiement.methode}</span>
              <span>{paiement.creeLe?.slice(0, 10) || "-"}</span>
              <span className={`admin-status ${paiement.statut === "complete" ? "confirme" : "en_attente"}`}>
                {statutPaiement[paiement.statut] || paiement.statut}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminPayments;
