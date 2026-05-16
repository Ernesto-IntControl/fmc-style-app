import salon from "../assets/salon-interieur.png";
import manucure from "../assets/manucure.png";
import spa from "../assets/spa.png";

function Home({ setPage, utilisateur }) {
  return (
    <>
      <section className="hero-home">
        <div className="hero-copy">
          <p className="eyebrow">Salon de beaute avec assistant virtuel</p>
          <h1>L'Excellence de la Beaute</h1>
          <p>
            Decouvrez une experience de soin moderne ou chaque reservation est guidee par une conciergerie virtuelle
            simple, rapide et disponible 24/7.
          </p>
          <div className="actions">
            <button className="btn-primary" onClick={() => setPage(utilisateur ? "booking" : "login")}>
              Reserver maintenant
            </button>
            <button className="btn-secondary" onClick={() => setPage(utilisateur ? "chat" : "login")}>
              Discuter avec l'assistant
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Nos collections</p>
          <h2>Services d'Exception</h2>
          <p>Une selection courte et claire pour une demonstration fluide : visage, coiffure, manucure et rituels spa.</p>
        </div>
        <div className="service-grid">
          <article className="service-card">
            <img src={spa} alt="Soin du visage" />
            <div className="service-card-body">
              <h3>Soins du Visage</h3>
              <p>Rituels hydratants, nettoyage profond et soins eclat.</p>
              <div className="service-meta">
                <span>A partir de 120 $</span>
                <span>60 min</span>
              </div>
            </div>
          </article>
          <article className="service-card">
            <img src={salon} alt="Coiffure" />
            <div className="service-card-body">
              <h3>Coiffure Haute Couture</h3>
              <p>Tresses, brushing, balayage et styles personnalises.</p>
              <div className="service-meta">
                <span>A partir de 85 $</span>
                <span>120 min</span>
              </div>
            </div>
          </article>
          <article className="service-card">
            <img src={manucure} alt="Manucure spa" />
            <div className="service-card-body">
              <h3>Manucure Spa</h3>
              <p>Soin des mains, finition naturelle et details elegants.</p>
              <div className="service-meta">
                <span>A partir de 45 $</span>
                <span>45 min</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section alt split">
        <img src={manucure} alt="Station de manucure FMC Style" />
        <div className="panel">
          <p className="eyebrow">Conciergerie virtuelle</p>
          <h2>Un assistant personnel pour prendre rendez-vous</h2>
          <p>
            Le client peut demander un rendez-vous en langage naturel, choisir un service, une date, un creneau, puis
            finaliser avec un paiement simule.
          </p>
          <button className="btn-primary" onClick={() => setPage(utilisateur ? "chat" : "login")}>
            Demarrer la conversation
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
