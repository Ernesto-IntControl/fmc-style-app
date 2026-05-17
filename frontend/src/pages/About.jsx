import salon from "../assets/salon-interieur.png";
import reception from "../assets/reception.png";

function About() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <img src={salon} alt="Salon FMC Style" />
        <div>
          <p className="eyebrow">Notre salon</p>
          <h1>L'essence de FMC Style</h1>
          <p>Un espace de beaute premium pense pour unir soin, simplicite digitale et accompagnement humain.</p>
        </div>
      </div>
      <div className="about-values">
        <article>
          <span>01</span>
          <h3>Purete visuelle</h3>
          <p>Une experience claire, calme et facile a comprendre.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Design meticuleux</h3>
          <p>Des services organises pour reserver rapidement.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Conciergerie</h3>
          <p>Un assistant capable de conseiller et d'orienter.</p>
        </article>
      </div>
      <img className="about-wide" src={reception} alt="Reception FMC Style" />
    </section>
  );
}

export default About;
