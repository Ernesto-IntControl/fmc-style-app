import { useEffect, useMemo, useState } from "react";
import { getAdminAppointments, getAdminPayments } from "../services/adminService";
import { extraireClients, filtrerTexte, formatPrix } from "./adminUtils";

function AdminClients() {
  const [rendezVous, setRendezVous] = useState([]);
  const [paiements, setPaiements] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    Promise.all([getAdminAppointments(), getAdminPayments()])
      .then(([listeRdv, listePaiements]) => {
        setRendezVous(listeRdv);
        setPaiements(listePaiements);
      })
      .catch(() => {
        setRendezVous([]);
        setPaiements([]);
      });
  }, []);

  const clients = useMemo(() => filtrerTexte(extraireClients(rendezVous), recherche, [(client) => client.nom, (client) => client.email]), [
    rendezVous,
    recherche,
  ]);

  const historiqueClient = selection ? rendezVous.filter((rdv) => rdv.client?.id === selection.id) : [];
  const paiementsClient = selection
    ? paiements.filter((paiement) => paiement.rendezVous?.client?.id === selection.id)
    : [];

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Relation client</p>
        <h1>Clients</h1>
        <p>Retrouvez l'historique, la fidelite, les paiements et les preferences par client.</p>
      </header>

      <section className="admin-card admin-toolbar">
        <input value={recherche} onChange={(event) => setRecherche(event.target.value)} placeholder="Rechercher un client..." />
      </section>

      <section className="admin-dashboard-grid">
        <article className="admin-card admin-table-card">
          <div className="admin-table clients-table">
            <div className="admin-table-row head">
              <span>Client</span>
              <span>Telephone</span>
              <span>Visites</span>
              <span>Panier moyen</span>
              <span>Dernier RDV</span>
              <span>Action</span>
            </div>
            {clients.map((client) => (
              <div className="admin-table-row" key={client.id}>
                <strong>{client.nom}</strong>
                <span>{client.telephone || "Non renseigne"}</span>
                <span>{client.visites}</span>
                <span>{formatPrix(client.total / Math.max(client.visites, 1))}</span>
                <span>{client.dernierRdv}</span>
                <button type="button" onClick={() => setSelection(client)}>
                  Fiche
                </button>
              </div>
            ))}
          </div>
        </article>

        <aside className="admin-card">
          <div className="admin-section-title">
            <h2>Fiche client</h2>
          </div>
          {selection ? (
            <div className="client-admin-detail">
              <h3>{selection.nom}</h3>
              <p>{selection.email}</p>
              <p>{selection.telephone || "Telephone non renseigne"}</p>
              <div className="mini-stats">
                <span>{selection.visites} visites</span>
                <span>{formatPrix(selection.total)} total</span>
                <span>{selection.inspirations} inspirations</span>
              </div>
              <h4>Historique rendez-vous</h4>
              {historiqueClient.slice(0, 4).map((rdv) => (
                <p key={rdv.id}>
                  {rdv.date} - {rdv.service?.nom}
                </p>
              ))}
              <h4>Paiements</h4>
              {paiementsClient.slice(0, 3).map((paiement) => (
                <p key={paiement.id}>{formatPrix(paiement.montantFinal)}</p>
              ))}
            </div>
          ) : (
            <p>Selectionnez un client pour voir sa fiche complete.</p>
          )}
        </aside>
      </section>
    </div>
  );
}

export default AdminClients;
