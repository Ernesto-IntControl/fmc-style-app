import { useEffect, useMemo, useState } from "react";
import { deleteAppointment, getAdminAppointments, getAdminEmployees, getAdminServices, updateAppointmentStatus } from "../services/adminService";
import { filtrerTexte, formatPrix, nomClient, nomEmploye, statutPaiement, statutRdv } from "./adminUtils";

function AdminAppointments() {
  const [rendezVous, setRendezVous] = useState([]);
  const [services, setServices] = useState([]);
  const [employes, setEmployes] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [filtre, setFiltre] = useState({ date: "", service: "", employe: "", statut: "" });
  const [selection, setSelection] = useState(null);
  const [erreur, setErreur] = useState("");

  const charger = () => {
    Promise.all([getAdminAppointments(), getAdminServices(), getAdminEmployees()])
      .then(([listeRdv, listeServices, listeEmployes]) => {
        setRendezVous(listeRdv);
        setServices(listeServices);
        setEmployes(listeEmployes);
      })
      .catch((error) => setErreur(error.message));
  };

  useEffect(() => {
    charger();
  }, []);

  const liste = useMemo(() => {
    const parFiltres = rendezVous.filter((rdv) => {
      if (filtre.date && rdv.date !== filtre.date) return false;
      if (filtre.service && String(rdv.serviceId) !== filtre.service) return false;
      if (filtre.employe && String(rdv.employeId) !== filtre.employe) return false;
      if (filtre.statut && rdv.statut !== filtre.statut) return false;
      return true;
    });
    return filtrerTexte(parFiltres, recherche, [
      nomClient,
      (rdv) => rdv.service?.nom,
      nomEmploye,
      (rdv) => rdv.statut,
    ]);
  }, [rendezVous, recherche, filtre]);

  const changerStatut = async (rdv, statut) => {
    await updateAppointmentStatus(rdv.id, { statut, statutPaiement: rdv.statutPaiement });
    charger();
  };

  const supprimer = async (rdv) => {
    await deleteAppointment(rdv.id);
    setSelection(null);
    charger();
  };

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Operations</p>
        <h1>Rendez-vous</h1>
        <p>Recherchez, filtrez, confirmez ou annulez les reservations du salon.</p>
      </header>
      {erreur && <p className="error">{erreur}</p>}

      <section className="admin-card admin-toolbar">
        <input value={recherche} onChange={(event) => setRecherche(event.target.value)} placeholder="Rechercher client, service, employe..." />
        <input type="date" value={filtre.date} onChange={(event) => setFiltre({ ...filtre, date: event.target.value })} />
        <select value={filtre.service} onChange={(event) => setFiltre({ ...filtre, service: event.target.value })}>
          <option value="">Tous les services</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.nom}
            </option>
          ))}
        </select>
        <select value={filtre.employe} onChange={(event) => setFiltre({ ...filtre, employe: event.target.value })}>
          <option value="">Tous les employes</option>
          {employes.map((employe) => (
            <option key={employe.id} value={employe.id}>
              {employe.utilisateur?.nom || employe.titrePoste}
            </option>
          ))}
        </select>
        <select value={filtre.statut} onChange={(event) => setFiltre({ ...filtre, statut: event.target.value })}>
          <option value="">Tous les statuts</option>
          <option value="en_attente">En attente</option>
          <option value="confirme">Confirme</option>
          <option value="termine">Termine</option>
          <option value="annule">Annule</option>
        </select>
      </section>

      <section className="admin-card admin-table-card">
        <div className="admin-table appointments-table">
          <div className="admin-table-row head">
            <span>Client</span>
            <span>Service</span>
            <span>Employe</span>
            <span>Date</span>
            <span>Heure</span>
            <span>Statut</span>
            <span>Paiement</span>
            <span>Actions</span>
          </div>
          {liste.map((rdv) => (
            <div className="admin-table-row" key={rdv.id}>
              <strong>{nomClient(rdv)}</strong>
              <span>{rdv.service?.nom || "Service"}</span>
              <span>{nomEmploye(rdv)}</span>
              <span>{rdv.date}</span>
              <span>{rdv.heure}</span>
              <span className={`admin-status ${rdv.statut}`}>{statutRdv[rdv.statut] || rdv.statut}</span>
              <span>{statutPaiement[rdv.statutPaiement] || rdv.statutPaiement}</span>
              <div className="table-actions">
                <button type="button" onClick={() => setSelection(rdv)}>
                  Detail
                </button>
                <button type="button" onClick={() => changerStatut(rdv, "confirme")}>
                  Confirmer
                </button>
                <button type="button" onClick={() => changerStatut(rdv, "annule")}>
                  Annuler
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selection && (
        <section className="admin-card detail-panel">
          <div className="admin-section-title">
            <h2>Detail rendez-vous</h2>
            <button type="button" onClick={() => setSelection(null)}>
              Fermer
            </button>
          </div>
          <div className="detail-grid">
            <div>
              <span>Client</span>
              <strong>{nomClient(selection)}</strong>
              <small>{selection.client?.email || "Email non renseigne"}</small>
            </div>
            <div>
              <span>Service</span>
              <strong>{selection.service?.nom}</strong>
              <small>{formatPrix(selection.service?.prix)}</small>
            </div>
            <div>
              <span>Notes</span>
              <p>{selection.notes || "Aucune note client."}</p>
            </div>
            <div>
              <span>Photos inspiration</span>
              <strong>{Array.isArray(selection.imagesInspiration) ? selection.imagesInspiration.length : 0}</strong>
              <small>Fichiers envoyes par le client</small>
            </div>
          </div>
          <div className="detail-actions">
            <button type="button" onClick={() => changerStatut(selection, "confirme")}>
              Confirmer
            </button>
            <button type="button">Reassigner</button>
            <button type="button" onClick={() => supprimer(selection)}>
              Supprimer
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default AdminAppointments;
