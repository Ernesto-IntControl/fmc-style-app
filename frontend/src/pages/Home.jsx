import salon from "../assets/salon-interieur.png";
import reception from "../assets/reception.png";
import manucure from "../assets/manucure.png";
import spa from "../assets/spa.png";

function Home({ setPage, utilisateur }) {
  const ouvrirReservation = () => setPage(utilisateur ? "booking" : "login");
  const ouvrirAssistant = () => setPage(utilisateur ? "chat" : "login");

  return (
    <div className="home-page">
      <section className="hero-home">
        <div className="hero-copy">
          <p className="eyebrow">FMC STYLE</p>
          <h1>L'excellence de la beaute, guidee par votre conciergerie.</h1>
          <p>
            Un sanctuaire moderne pour choisir un soin, discuter avec une conciergerie virtuelle et reserver un
            rendez-vous en quelques instants.
          </p>
          <div className="actions hero-actions">
            <button className="btn-primary" onClick={ouvrirReservation}>
              Reserver maintenant
            </button>
            <button className="btn-secondary" onClick={ouvrirAssistant}>
              Discuter avec l'assistant
            </button>
          </div>
          <div className="hero-signals" aria-label="Points forts FMC Style">
            <span>09h - 16h</span>
            <span>Services premium</span>
            <span>Paiement simule</span>
          </div>
        </div>
      </section>

      <section className="home-editorial">
        <div className="editorial-image">
          <img src={reception} alt="Reception FMC Style" />
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">L'essence FMC Style</p>
          <h2>Un parcours clair, elegant et pense pour reserver sans friction.</h2>
          <p>
            La page d'accueil installe immediatement le salon, puis oriente le visiteur vers les services ou vers la
            conciergerie virtuelle capable de conseiller, comprendre une intention et proposer un creneau.
          </p>
          <button className="text-link" onClick={() => setPage("services")}>
            Decouvrir les services
          </button>
        </div>
      </section>

      <section className="section home-services">
        <div className="section-header">
          <p className="eyebrow">Nos collections</p>
          <h2>Services signature</h2>
          <p>Une selection courte, lisible et adaptee a une demonstration academique fluide.</p>
        </div>
        <div className="service-showcase">
          <article className="showcase-card showcase-card-large">
            <img src={spa} alt="Soin du visage signature" />
            <div>
              <span>Soin du visage eclat</span>
              <strong>A partir de 120 $</strong>
            </div>
          </article>
          <article className="showcase-card">
            <img src={salon} alt="Coiffure haute couture" />
            <div>
              <span>Coiffure haute couture</span>
              <strong>A partir de 85 $</strong>
            </div>
          </article>
          <article className="showcase-card">
            <img src={manucure} alt="Manucure spa premium" />
            <div>
              <span>Manucure spa</span>
              <strong>A partir de 45 $</strong>
            </div>
          </article>
        </div>
      </section>

      <section className="home-proof">
        <div className="section-header">
          <p className="eyebrow">Confiance et eclat</p>
          <h2>Vos experiences FMC Style</h2>
        </div>
        <div className="proof-grid">
          <article>
            <span>★★★★★</span>
            <p>Une prise de rendez-vous simple et rapide. L'assistant m'a aidee a choisir le soin parfait.</p>
            <strong>Sarah M.</strong>
          </article>
          <article>
            <span>★★★★★</span>
            <p>Le parcours est clair, les services sont bien presentes et le planning est facile a comprendre.</p>
            <strong>Claire L.</strong>
          </article>
          <article>
            <span>★★★★★</span>
            <p>J'ai pu decrire mon style, ajouter une note et confirmer mon rendez-vous sans perdre de temps.</p>
            <strong>Aria N.</strong>
          </article>
        </div>
      </section>

      <section className="home-concierge">
        <div className="concierge-copy">
          <p className="eyebrow">Conciergerie virtuelle</p>
          <h2>Votre assistant personnel, disponible avant la reservation.</h2>
          <p>
            L'assistant peut saluer, conseiller un service, comprendre une demande naturelle, identifier les informations
            manquantes et orienter le client vers le bon creneau.
          </p>
          <button className="btn-primary" onClick={ouvrirAssistant}>
            Demarrer la conversation
          </button>
        </div>
        <div className="concierge-chat" aria-label="Apercu du chat FMC Concierge">
          <div className="chat-avatar">
            <span>A</span>
            <div>
              <strong>FMC Concierge</strong>
              <small>En ligne</small>
            </div>
          </div>
          <p>Bonjour, quel rituel souhaitez-vous decouvrir aujourd'hui ?</p>
          <p className="is-user">Je veux avoir bonne mine mais je ne sais pas quel soin choisir.</p>
          <p>Je vous conseille le soin du visage eclat. Souhaitez-vous voir les creneaux disponibles ?</p>
          <button onClick={ouvrirAssistant}>Ouvrir la conciergerie</button>
        </div>
      </section>

      <section className="home-newsletter">
        <p className="eyebrow">Rejoignez l'univers FMC Style</p>
        <h2>Recevez les offres et nouveautes du salon.</h2>
        <form>
          <input type="email" placeholder="Votre adresse email" />
          <button className="btn-dark" type="button">
            S'abonner
          </button>
        </form>
      </section>
    </div>
  );
}

export default Home;
