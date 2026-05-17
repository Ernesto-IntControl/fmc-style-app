import manucure from "../assets/manucure.png";
import reception from "../assets/reception.png";
import spa from "../assets/spa.png";

const inspirations = [
  { id: 1, titre: "Texture lumineuse", image: spa },
  { id: 2, titre: "Manucure rose naturel", image: manucure },
  { id: 3, titre: "Ambiance salon", image: reception },
];

function ClientInspirations() {
  return (
    <div className="client-page">
      <header className="client-heading compact">
        <p className="eyebrow">References visuelles</p>
        <h1>Mes inspirations</h1>
        <p>Centralisez les photos utiles avant un rendez-vous pour guider l'equipe du salon.</p>
      </header>

      <section className="client-card inspiration-upload-card">
        <div>
          <h2>Ajouter une inspiration</h2>
          <p>Images JPG ou PNG, jusqu'a cinq references par rendez-vous.</p>
        </div>
        <button className="btn-primary" type="button">
          Selectionner des fichiers
        </button>
      </section>

      <section className="inspiration-grid">
        {inspirations.map((item) => (
          <article className="client-card inspiration-card" key={item.id}>
            <img src={item.image} alt={item.titre} />
            <div>
              <h3>{item.titre}</h3>
              <button type="button">Supprimer</button>
            </div>
          </article>
        ))}
        <article className="client-card inspiration-card empty">
          <span>+</span>
          <p>Nouvelle inspiration</p>
        </article>
      </section>
    </div>
  );
}

export default ClientInspirations;
