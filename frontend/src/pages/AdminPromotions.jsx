import { useEffect, useMemo, useState } from "react";
import { createPromotion, deletePromotion, getAdminPromotions, getAdminServices, updatePromotion } from "../services/adminService";
import { filtrerTexte, formatPrix } from "./adminUtils";

const promotionInitiale = {
  titre: "",
  description: "",
  typeRemise: "pourcentage",
  valeur: "",
  dateDebut: "",
  dateFin: "",
  estActive: true,
  image: "",
  servicesIds: [],
};

function AdminPromotions() {
  const [promotions, setPromotions] = useState([]);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(promotionInitiale);
  const [edition, setEdition] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [erreur, setErreur] = useState("");

  const charger = () => {
    Promise.all([getAdminPromotions(), getAdminServices()])
      .then(([listePromotions, listeServices]) => {
        setPromotions(listePromotions);
        setServices(listeServices);
      })
      .catch((error) => setErreur(error.message));
  };

  useEffect(() => {
    charger();
  }, []);

  const liste = useMemo(() => filtrerTexte(promotions, recherche, [(promotion) => promotion.titre, (promotion) => promotion.description]), [
    promotions,
    recherche,
  ]);

  const changerService = (id, actif) => {
    setForm((actuel) => ({
      ...actuel,
      servicesIds: actif ? [...actuel.servicesIds, id] : actuel.servicesIds.filter((item) => item !== id),
    }));
  };

  const soumettre = async (event) => {
    event.preventDefault();
    const donnees = { ...form, valeur: Number(form.valeur) };
    if (edition) await updatePromotion(edition, donnees);
    else await createPromotion(donnees);
    setForm(promotionInitiale);
    setEdition(null);
    charger();
  };

  const modifier = (promotion) => {
    setEdition(promotion.id);
    setForm({
      titre: promotion.titre,
      description: promotion.description || "",
      typeRemise: promotion.typeRemise,
      valeur: promotion.valeur,
      dateDebut: promotion.dateDebut || "",
      dateFin: promotion.dateFin || "",
      estActive: promotion.estActive,
      image: promotion.image || "",
      servicesIds: promotion.services?.map((service) => service.id) || [],
    });
  };

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Campagnes</p>
        <h1>Promotions</h1>
        <p>Planifiez les offres, associez les services et suivez leur impact commercial.</p>
      </header>
      {erreur && <p className="error">{erreur}</p>}

      <section className="admin-management-grid">
        <form className="admin-card admin-form" onSubmit={soumettre}>
          <h2>{edition ? "Modifier campagne" : "Creer une offre"}</h2>
          <label>
            Nom de la promotion
            <input value={form.titre} onChange={(event) => setForm({ ...form, titre: event.target.value })} required />
          </label>
          <label>
            Description
            <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          </label>
          <div className="form-two">
            <label>
              Type
              <select value={form.typeRemise} onChange={(event) => setForm({ ...form, typeRemise: event.target.value })}>
                <option value="pourcentage">Pourcentage</option>
                <option value="fixe">Fixe</option>
              </select>
            </label>
            <label>
              Valeur
              <input type="number" value={form.valeur} onChange={(event) => setForm({ ...form, valeur: event.target.value })} required />
            </label>
          </div>
          <div className="form-two">
            <label>
              Debut
              <input type="date" value={form.dateDebut} onChange={(event) => setForm({ ...form, dateDebut: event.target.value })} />
            </label>
            <label>
              Fin
              <input type="date" value={form.dateFin} onChange={(event) => setForm({ ...form, dateFin: event.target.value })} />
            </label>
          </div>
          <div className="competence-box">
            {services.slice(0, 8).map((service) => (
              <label key={service.id}>
                <input
                  type="checkbox"
                  checked={form.servicesIds.includes(service.id)}
                  onChange={(event) => changerService(service.id, event.target.checked)}
                />
                {service.nom}
              </label>
            ))}
          </div>
          <label className="check-line">
            <input type="checkbox" checked={form.estActive} onChange={(event) => setForm({ ...form, estActive: event.target.checked })} />
            Campagne active
          </label>
          <button className="btn-primary" type="submit">
            Generer la campagne
          </button>
        </form>

        <div className="admin-list-zone">
          <section className="admin-card admin-toolbar">
            <input value={recherche} onChange={(event) => setRecherche(event.target.value)} placeholder="Rechercher des promotions..." />
          </section>
          <section className="admin-card admin-table-card">
            <div className="admin-table promotions-table">
              <div className="admin-table-row head">
                <span>Campagne</span>
                <span>Valeur</span>
                <span>Duree</span>
                <span>Services</span>
                <span>Statut</span>
                <span>Actions</span>
              </div>
              {liste.map((promotion) => (
                <div className="admin-table-row" key={promotion.id}>
                  <strong>{promotion.titre}</strong>
                  <span>{promotion.typeRemise === "fixe" ? formatPrix(promotion.valeur) : `${Number(promotion.valeur)}%`}</span>
                  <span>
                    {promotion.dateDebut || "Permanent"} - {promotion.dateFin || "Libre"}
                  </span>
                  <span>{promotion.services?.length || 0}</span>
                  <span className={`admin-status ${promotion.estActive ? "confirme" : "annule"}`}>
                    {promotion.estActive ? "Active" : "Pause"}
                  </span>
                  <div className="table-actions">
                    <button type="button" onClick={() => modifier(promotion)}>
                      Modifier
                    </button>
                    <button type="button" onClick={() => updatePromotion(promotion.id, { estActive: !promotion.estActive }).then(charger)}>
                      {promotion.estActive ? "Desactiver" : "Activer"}
                    </button>
                    <button type="button" onClick={() => deletePromotion(promotion.id).then(charger)}>
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="promotion-impact">
            <article className="admin-card">
              <span>Impact revenus</span>
              <strong>18.4%</strong>
              <p>Hausse estimee via campagnes actives.</p>
            </article>
            <article className="admin-card dark-insight">
              <span>Apercu client</span>
              <strong>{promotions.find((promotion) => promotion.estActive)?.titre || "Aucune campagne active"}</strong>
              <p>Les promotions actives sont visibles dans la vitrine publique.</p>
            </article>
          </section>
        </div>
      </section>
    </div>
  );
}

export default AdminPromotions;
