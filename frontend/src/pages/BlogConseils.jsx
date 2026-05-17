import spa from "../assets/spa.png";
import manucure from "../assets/manucure.png";
import reception from "../assets/reception.png";

function BlogConseils() {
  return (
    <section className="blog-page">
      <div className="blog-hero">
        <p className="eyebrow">Articles & conseils beaute</p>
        <h1>Le Journal FMC Style</h1>
        <p>Lectures courtes, conseils experts et inspirations pour preparer votre prochain rituel.</p>
      </div>
      <div className="blog-layout">
        <article className="blog-feature">
          <img src={spa} alt="Produits de soin FMC Style" />
          <p className="eyebrow">Soins du visage</p>
          <h2>La science du double nettoyage</h2>
          <p>Une routine simple et precise pour retrouver une peau nette, lumineuse et prete a recevoir vos soins.</p>
        </article>
        <aside className="blog-side">
          <h3>L'astuce du mois</h3>
          <p>Vaporisez une eau florale avant votre serum pour renforcer l'hydratation.</p>
          <p>Trois minutes de massage ascendant suffisent pour reveiller l'eclat.</p>
        </aside>
        <article className="blog-card">
          <img src={manucure} alt="Manucure FMC Style" />
          <h3>Manucure spa : la finition minimaliste</h3>
        </article>
        <article className="blog-card">
          <img src={reception} alt="Salon FMC Style" />
          <h3>Comment choisir le bon rituel avant un evenement</h3>
        </article>
      </div>
    </section>
  );
}

export default BlogConseils;
