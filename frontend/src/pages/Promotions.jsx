import manucure from "../assets/manucure.png";
import reception from "../assets/reception.png";
import spa from "../assets/spa.png";

const promotions = [
  {
    titre: "Rituel eclat du mois",
    valeur: "-20%",
    description: "Soin visage signature et diagnostic personnalise pour retrouver une peau lumineuse.",
    image: spa,
  },
  {
    titre: "Duo mains parfaites",
    valeur: "-15%",
    description: "Manucure spa premium avec finition brillante et soin nourrissant.",
    image: manucure,
  },
  {
    titre: "Premiere visite FMC",
    valeur: "-10%",
    description: "Offre de bienvenue valable sur une selection de services coiffure et soins.",
    image: reception,
  },
];

function Promotions({ setPage, utilisateur }) {
  const reserver = () => setPage(utilisateur ? "booking" : "login");

  return (
    <div className="promotions-page">
      <section className="public-hero">
        <p className="eyebrow">Avantages du salon</p>
        <h1>Promotions FMC Style</h1>
        <p>
          Des offres sobres et selectives pour decouvrir nos rituels de beaute sans perdre l'esprit premium du salon.
        </p>
      </section>

      <section className="promotions-grid">
        {promotions.map((promotion) => (
          <article className="promotion-card" key={promotion.titre}>
            <img src={promotion.image} alt={promotion.titre} />
            <div>
              <span>{promotion.valeur}</span>
              <h2>{promotion.titre}</h2>
              <p>{promotion.description}</p>
              <button type="button" onClick={reserver}>
                Reserver
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Promotions;
