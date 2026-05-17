import { useEffect, useMemo, useState } from "react";
import salon from "../assets/salon-interieur.png";
import reception from "../assets/reception.png";
import manucure from "../assets/manucure.png";
import spa from "../assets/spa.png";
import { getServices } from "../services/appointmentService";

const images = [salon, spa, reception, manucure];

function Services({ setPage, setReservation }) {
  const [services, setServices] = useState([]);
  const [erreur, setErreur] = useState("");
  const [categorie, setCategorie] = useState("coiffure");

  useEffect(() => {
    getServices().then(setServices).catch((error) => setErreur(error.message));
  }, []);

  const trouverService = (mot) => services.find((service) => service.nom.toLowerCase().includes(mot));
  const serviceTresses = trouverService("tresses") || services[0];
  const serviceVisage = trouverService("visage") || services[1] || services[0];
  const serviceManucure = trouverService("manucure") || services[2] || services[0];

  const cartesPrincipales = useMemo(
    () => [
      {
        titre: "Signature Sculpt & Blowout",
        description: "Architecture capillaire personnalisee, finitions nettes et volume souple.",
        prix: serviceTresses ? Number(serviceTresses.prix) : 85,
        duree: serviceTresses?.duree || 120,
        image: salon,
        service: serviceTresses,
      },
      {
        titre: "FMC STYLE Hand-Painted Balayage",
        description: "Transitions lumineuses peintes a la main pour un resultat naturel.",
        prix: 280,
        duree: 180,
        image: reception,
        service: serviceTresses,
        badge: "Promotion",
      },
      {
        titre: "Botanical Ritual Treatment",
        description: "Rituel nourrissant pour cuir chevelu et longueurs, inspire des soins spa.",
        prix: serviceVisage ? Number(serviceVisage.prix) : 120,
        duree: serviceVisage?.duree || 60,
        image: spa,
        service: serviceVisage,
      },
    ],
    [serviceTresses, serviceVisage]
  );

  const reserver = (service) => {
    if (!service) return setPage("login");
    setReservation({ service });
    setPage("booking");
  };

  return (
    <section className="services-page">
      <div className="services-hero">
        <h1>L'Art du Soin</h1>
        <p>
          Decouvrez une selection rigoureuse de soins transformateurs concus pour harmoniser votre essence interieure
          avec votre eclat exterieur.
        </p>
      </div>

      <nav className="service-tabs" aria-label="Categories de services">
        {[
          ["coiffure", "Art de la coiffure"],
          ["visage", "Soins visage"],
          ["mains", "Beaute des mains"],
        ].map(([id, label]) => (
          <button key={id} className={categorie === id ? "active" : ""} onClick={() => setCategorie(id)}>
            {label}
          </button>
        ))}
      </nav>

      {erreur && <p className="error services-error">{erreur}</p>}

      <div className="services-container">
        <section className="service-section">
          <div className="service-section-title">
            <h2>Art de la Coiffure</h2>
            <span></span>
          </div>
          <div className="service-cards-large">
            {cartesPrincipales.map((carte, index) => (
              <article className="service-product-card" key={carte.titre}>
                <div className="service-image-wrap">
                  {carte.badge && <span className="service-badge">{carte.badge}</span>}
                  <img src={carte.image || images[index]} alt={carte.titre} />
                </div>
                <div className="service-product-content">
                  <div className="service-title-line">
                    <h3>{carte.titre}</h3>
                    <strong>${carte.prix}</strong>
                  </div>
                  <p>{carte.description}</p>
                  <div className="service-product-actions">
                    <span>{carte.duree} minutes</span>
                    <button onClick={() => reserver(carte.service)}>Reserver</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="service-section">
          <div className="service-section-title">
            <h2>Onglerie Couture</h2>
            <span></span>
          </div>
          <div className="service-feature-grid">
            <img src={manucure} alt="Rituel manucure FMC Style" />
            <article className="service-feature-card">
              <p className="eyebrow">Signature experience</p>
              <h3>Gainage Gel Minimaliste</h3>
              <p>
                Travail de precision des cuticules suivi d'une base gel structuree renforcante et d'une application de
                couleur ultra-fine.
              </p>
              <div className="feature-columns">
                <p>Travail de precision des cuticules et finition naturelle.</p>
                <p>Base structuree, couleur fine et tenue elegante.</p>
              </div>
              <button className="btn-primary" onClick={() => reserver(serviceManucure)}>
                Selectionner
              </button>
            </article>
            <article className="service-outline-card">
              <span>Precision</span>
              <h3>Le Rituel Pedicure Essentiel</h3>
              <p>Un bain floral, une exfoliation douce et un massage reparateur aux pierres volcaniques.</p>
              <strong>$110 / 60m</strong>
              <button onClick={() => reserver(serviceManucure)}>Selectionner</button>
            </article>
            <article className="service-dark-card">
              <h3>Advanced Peel Series</h3>
              <p>Traitements de surface cibles pour corriger les textures irregulieres.</p>
              <strong>$185 / 45m</strong>
              <button onClick={() => reserver(serviceVisage)}>Reserver</button>
            </article>
          </div>
        </section>

        <section className="service-section">
          <div className="service-section-title">
            <h2>Soins Visage</h2>
            <span></span>
          </div>
          <div className="compact-services">
            <article className="compact-service">
              <img src={spa} alt="Soin visage FMC Style" />
              <div>
                <h3>Soin du Visage Eclat</h3>
                <p>Nettoyage profond, hydratation et glow naturel.</p>
                <span>60 min</span>
              </div>
              <strong>${serviceVisage ? Number(serviceVisage.prix).toFixed(0) : 120}</strong>
              <button onClick={() => reserver(serviceVisage)}>Choisir</button>
            </article>
            <article className="compact-service">
              <img src={manucure} alt="Manucure FMC Style" />
              <div>
                <h3>Minimalist Gel Overlay</h3>
                <p>Precision cuticule et application fine.</p>
                <span>45 min</span>
              </div>
              <strong>${serviceManucure ? Number(serviceManucure.prix).toFixed(0) : 45}</strong>
              <button onClick={() => reserver(serviceManucure)}>Choisir</button>
            </article>
          </div>
        </section>

        <section className="consultation-block">
          <p className="eyebrow">Beaute sur mesure</p>
          <h2>Vous ne savez pas quel soin vous convient ?</h2>
          <p>
            Nos consultants experts sont disponibles pour des evaluations virtuelles et en personne afin de construire
            votre feuille de route beaute personnalisee.
          </p>
          <button onClick={() => setPage("chat")}>Demander une consultation</button>
        </section>
      </div>
    </section>
  );
}

export default Services;
