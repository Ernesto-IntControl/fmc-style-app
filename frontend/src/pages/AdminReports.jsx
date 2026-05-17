import { useEffect, useMemo, useState } from "react";
import { getAdminData } from "../services/adminService";
import { formatPrix, nomEmploye } from "./adminUtils";

function AdminReports() {
  const [donnees, setDonnees] = useState({ rendezVous: [], services: [], employes: [], promotions: [], paiements: [] });

  useEffect(() => {
    getAdminData().then(setDonnees).catch(() => {});
  }, []);

  const rapports = useMemo(() => {
    const revenus = donnees.paiements.reduce((total, paiement) => total + Number(paiement.montantFinal || 0), 0);
    const services = donnees.rendezVous.reduce((acc, rdv) => {
      const nom = rdv.service?.nom || "Service";
      acc[nom] = (acc[nom] || 0) + 1;
      return acc;
    }, {});
    const employes = donnees.rendezVous.reduce((acc, rdv) => {
      const nom = nomEmploye(rdv);
      acc[nom] = (acc[nom] || 0) + 1;
      return acc;
    }, {});
    return {
      revenus,
      reservations: donnees.rendezVous.length,
      services: Object.entries(services).slice(0, 5),
      employes: Object.entries(employes).slice(0, 5),
    };
  }, [donnees]);

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Pilotage</p>
        <h1>Rapports & Analyses</h1>
        <p>Une lecture simple des revenus, reservations, services populaires et performance employes.</p>
      </header>

      <section className="admin-kpi-grid compact">
        <article className="admin-card kpi-card">
          <span>Revenus</span>
          <strong>{formatPrix(rapports.revenus)}</strong>
        </article>
        <article className="admin-card kpi-card">
          <span>Reservations</span>
          <strong>{rapports.reservations}</strong>
        </article>
        <article className="admin-card kpi-card">
          <span>Promotions actives</span>
          <strong>{donnees.promotions.filter((promotion) => promotion.estActive).length}</strong>
        </article>
      </section>

      <section className="reports-grid">
        <article className="admin-card chart-card">
          <h2>Revenus</h2>
          <div className="bar-chart">
            {[35, 58, 42, 76, 64, 88].map((valeur, index) => (
              <span key={index} style={{ height: `${valeur}%` }}></span>
            ))}
          </div>
        </article>
        <article className="admin-card chart-card">
          <h2>Services populaires</h2>
          {rapports.services.map(([nom, total]) => (
            <div className="report-line" key={nom}>
              <span>{nom}</span>
              <meter min="0" max="10" value={total}></meter>
              <strong>{total}</strong>
            </div>
          ))}
        </article>
        <article className="admin-card chart-card">
          <h2>Performance employes</h2>
          {rapports.employes.map(([nom, total]) => (
            <div className="report-line" key={nom}>
              <span>{nom}</span>
              <meter min="0" max="10" value={total}></meter>
              <strong>{total}</strong>
            </div>
          ))}
        </article>
      </section>
    </div>
  );
}

export default AdminReports;
