import { useEffect, useMemo, useState } from "react";
import { createService, deleteService, getAdminPromotions, getAdminServices, updateService } from "../services/adminService";
import { categorieService, filtrerTexte, formatPrix } from "./adminUtils";

const serviceInitial = { nom: "", description: "", prix: "", duree: "", image: "", estActif: true };

function AdminServices() {
  const [services, setServices] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [form, setForm] = useState(serviceInitial);
  const [edition, setEdition] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState("");
  const [erreur, setErreur] = useState("");

  const charger = () => {
    Promise.all([getAdminServices(), getAdminPromotions()])
      .then(([listeServices, listePromotions]) => {
        setServices(listeServices);
        setPromotions(listePromotions);
      })
      .catch((error) => setErreur(error.message));
  };

  useEffect(() => {
    charger();
  }, []);

  const liste = useMemo(() => {
    const parCategorie = categorie ? services.filter((service) => categorieService(service) === categorie) : services;
    return filtrerTexte(parCategorie, recherche, [(service) => service.nom, (service) => service.description]);
  }, [services, recherche, categorie]);

  const changer = (champ, valeur) => setForm((actuel) => ({ ...actuel, [champ]: valeur }));

  const soumettre = async (event) => {
    event.preventDefault();
    const donnees = { ...form, prix: Number(form.prix), duree: Number(form.duree) };
    if (edition) await updateService(edition, donnees);
    else await createService(donnees);
    setForm(serviceInitial);
    setEdition(null);
    charger();
  };

  const modifier = (service) => {
    setEdition(service.id);
    setForm({
      nom: service.nom,
      description: service.description,
      prix: service.prix,
      duree: service.duree,
      image: service.image || "",
      estActif: service.estActif,
    });
  };

  const basculerActif = async (service) => {
    await updateService(service.id, { ...service, estActif: !service.estActif });
    charger();
  };

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Catalogue</p>
        <h1>Services</h1>
        <p>Gerez les offres, prix, durees, images et statuts visibles dans la vitrine.</p>
      </header>
      {erreur && <p className="error">{erreur}</p>}

      <section className="admin-management-grid">
        <form className="admin-card admin-form" onSubmit={soumettre}>
          <h2>{edition ? "Modifier le service" : "Ajouter un service"}</h2>
          <label>
            Nom
            <input value={form.nom} onChange={(event) => changer("nom", event.target.value)} required />
          </label>
          <label>
            Description
            <textarea value={form.description} onChange={(event) => changer("description", event.target.value)} required />
          </label>
          <div className="form-two">
            <label>
              Prix
              <input type="number" value={form.prix} onChange={(event) => changer("prix", event.target.value)} required />
            </label>
            <label>
              Duree
              <input type="number" value={form.duree} onChange={(event) => changer("duree", event.target.value)} required />
            </label>
          </div>
          <label>
            Image
            <input value={form.image} onChange={(event) => changer("image", event.target.value)} placeholder="/uploads/service.jpg" />
          </label>
          <label className="check-line">
            <input type="checkbox" checked={form.estActif} onChange={(event) => changer("estActif", event.target.checked)} />
            Service actif
          </label>
          <button className="btn-primary" type="submit">
            {edition ? "Enregistrer" : "Creer"}
          </button>
        </form>

        <div className="admin-list-zone">
          <section className="admin-card admin-toolbar">
            <input value={recherche} onChange={(event) => setRecherche(event.target.value)} placeholder="Rechercher un service..." />
            <select value={categorie} onChange={(event) => setCategorie(event.target.value)}>
              <option value="">Toutes les categories</option>
              <option value="coiffure">Coiffure</option>
              <option value="soins visage">Soins visage</option>
              <option value="manucure">Manucure</option>
              <option value="maquillage">Maquillage</option>
            </select>
          </section>
          <section className="admin-service-grid">
            {liste.map((service) => {
              const promotionLiee = promotions.find((promotion) => promotion.services?.some((item) => item.id === service.id));
              return (
                <article className="admin-card service-admin-card" key={service.id}>
                  <div>
                    <span>{categorieService(service)}</span>
                    <strong>{service.estActif ? "Actif" : "Inactif"}</strong>
                  </div>
                  <h2>{service.nom}</h2>
                  <p>{service.description}</p>
                  <div className="service-admin-meta">
                    <span>{formatPrix(service.prix)}</span>
                    <span>{service.duree} min</span>
                    <span>{promotionLiee?.titre || "Aucune promotion"}</span>
                  </div>
                  <div className="table-actions">
                    <button type="button" onClick={() => modifier(service)}>
                      Modifier
                    </button>
                    <button type="button" onClick={() => basculerActif(service)}>
                      {service.estActif ? "Desactiver" : "Activer"}
                    </button>
                    <button type="button" onClick={() => deleteService(service.id).then(charger)}>
                      Supprimer
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </div>
  );
}

export default AdminServices;
