import { useEffect, useMemo, useState } from "react";
import { createEmployee, deleteEmployee, getAdminAppointments, getAdminEmployees, getAdminServices, updateEmployee } from "../services/adminService";
import { filtrerTexte, servicesEmploye } from "./adminUtils";

const employeInitial = {
  utilisateurId: "",
  titrePoste: "",
  joursTravail: "lundi,mardi,mercredi,jeudi,vendredi",
  heureDebut: "09:00",
  heureFin: "18:00",
  estActif: true,
  competences: [],
};

function AdminEmployees() {
  const [employes, setEmployes] = useState([]);
  const [services, setServices] = useState([]);
  const [rendezVous, setRendezVous] = useState([]);
  const [form, setForm] = useState(employeInitial);
  const [edition, setEdition] = useState(null);
  const [selection, setSelection] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [erreur, setErreur] = useState("");

  const charger = () => {
    Promise.all([getAdminEmployees(), getAdminServices(), getAdminAppointments()])
      .then(([listeEmployes, listeServices, listeRdv]) => {
        setEmployes(listeEmployes);
        setServices(listeServices);
        setRendezVous(listeRdv);
      })
      .catch((error) => setErreur(error.message));
  };

  useEffect(() => {
    charger();
  }, []);

  const liste = useMemo(
    () => filtrerTexte(employes, recherche, [(employe) => employe.utilisateur?.nom, (employe) => employe.titrePoste]),
    [employes, recherche]
  );

  const changerCompetence = (id, actif) => {
    setForm((actuel) => ({
      ...actuel,
      competences: actif ? [...actuel.competences, id] : actuel.competences.filter((item) => item !== id),
    }));
  };

  const soumettre = async (event) => {
    event.preventDefault();
    const donnees = {
      ...form,
      utilisateurId: Number(form.utilisateurId),
      joursTravail: form.joursTravail.split(",").map((jour) => jour.trim()).filter(Boolean),
    };
    if (edition) await updateEmployee(edition, donnees);
    else await createEmployee(donnees);
    setForm(employeInitial);
    setEdition(null);
    charger();
  };

  const modifier = (employe) => {
    setEdition(employe.id);
    setForm({
      utilisateurId: employe.utilisateurId || "",
      titrePoste: employe.titrePoste || "",
      joursTravail: Array.isArray(employe.joursTravail) ? employe.joursTravail.join(",") : "",
      heureDebut: employe.heureDebut || "09:00",
      heureFin: employe.heureFin || "18:00",
      estActif: employe.estActif,
      competences: employe.competences?.map((service) => service.id) || [],
    });
    setSelection(employe);
  };

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Equipe</p>
        <h1>Employes</h1>
        <p>Gerez les specialites, disponibilites, horaires et performances des membres du salon.</p>
      </header>
      {erreur && <p className="error">{erreur}</p>}

      <section className="admin-management-grid">
        <form className="admin-card admin-form" onSubmit={soumettre}>
          <h2>{edition ? "Modifier employe" : "Ajouter employe"}</h2>
          <label>
            ID utilisateur
            <input value={form.utilisateurId} onChange={(event) => setForm({ ...form, utilisateurId: event.target.value })} required />
          </label>
          <label>
            Specialite
            <input value={form.titrePoste} onChange={(event) => setForm({ ...form, titrePoste: event.target.value })} required />
          </label>
          <label>
            Jours travailles
            <input value={form.joursTravail} onChange={(event) => setForm({ ...form, joursTravail: event.target.value })} />
          </label>
          <div className="form-two">
            <label>
              Debut
              <input value={form.heureDebut} onChange={(event) => setForm({ ...form, heureDebut: event.target.value })} />
            </label>
            <label>
              Fin
              <input value={form.heureFin} onChange={(event) => setForm({ ...form, heureFin: event.target.value })} />
            </label>
          </div>
          <div className="competence-box">
            {services.slice(0, 8).map((service) => (
              <label key={service.id}>
                <input
                  type="checkbox"
                  checked={form.competences.includes(service.id)}
                  onChange={(event) => changerCompetence(service.id, event.target.checked)}
                />
                {service.nom}
              </label>
            ))}
          </div>
          <label className="check-line">
            <input type="checkbox" checked={form.estActif} onChange={(event) => setForm({ ...form, estActif: event.target.checked })} />
            Disponible
          </label>
          <button className="btn-primary" type="submit">
            Enregistrer
          </button>
        </form>

        <div className="admin-list-zone">
          <section className="admin-card admin-toolbar">
            <input value={recherche} onChange={(event) => setRecherche(event.target.value)} placeholder="Rechercher par nom ou specialite..." />
          </section>
          <section className="admin-card admin-table-card">
            <div className="admin-table employee-table">
              <div className="admin-table-row head">
                <span>Employe</span>
                <span>Specialite</span>
                <span>Planning</span>
                <span>Reservations</span>
                <span>Statut</span>
                <span>Actions</span>
              </div>
              {liste.map((employe) => {
                const total = rendezVous.filter((rdv) => rdv.employeId === employe.id).length;
                return (
                  <div className="admin-table-row" key={employe.id}>
                    <strong>{employe.utilisateur?.nom || `Employe #${employe.id}`}</strong>
                    <span>{employe.titrePoste}</span>
                    <span>
                      {employe.heureDebut} - {employe.heureFin}
                    </span>
                    <span>{total}</span>
                    <span className={`admin-status ${employe.estActif ? "confirme" : "annule"}`}>
                      {employe.estActif ? "Disponible" : "Absent"}
                    </span>
                    <div className="table-actions">
                      <button type="button" onClick={() => setSelection(employe)}>
                        Detail
                      </button>
                      <button type="button" onClick={() => modifier(employe)}>
                        Modifier
                      </button>
                      <button type="button" onClick={() => deleteEmployee(employe.id).then(charger)}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </section>

      {selection && (
        <section className="admin-card detail-panel">
          <div className="admin-section-title">
            <h2>Fiche employe</h2>
            <button type="button" onClick={() => setSelection(null)}>
              Fermer
            </button>
          </div>
          <div className="detail-grid">
            <div>
              <span>Nom</span>
              <strong>{selection.utilisateur?.nom || "Employe"}</strong>
              <small>{selection.utilisateur?.email}</small>
            </div>
            <div>
              <span>Specialites</span>
              <p>{servicesEmploye(selection)}</p>
            </div>
            <div>
              <span>Planning</span>
              <strong>
                {selection.heureDebut} - {selection.heureFin}
              </strong>
              <small>{Array.isArray(selection.joursTravail) ? selection.joursTravail.join(", ") : "Jours a definir"}</small>
            </div>
            <div>
              <span>Rendez-vous recents</span>
              <strong>{rendezVous.filter((rdv) => rdv.employeId === selection.id).length}</strong>
              <small>Affectation automatique basee sur competences et disponibilite</small>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default AdminEmployees;
