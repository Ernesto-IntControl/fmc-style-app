import { useState } from "react";

function AdminSettings() {
  const [salon, setSalon] = useState({
    nom: "FMC STYLE",
    telephone: "+243 000 000 000",
    email: "contact@fmc-style.local",
    adresse: "Avenue du Salon, Kinshasa",
    ouverture: "09:00",
    fermeture: "18:00",
    paiement: "Simulation",
    notifications: true,
  });

  const changer = (champ, valeur) => setSalon((actuel) => ({ ...actuel, [champ]: valeur }));

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Configuration</p>
        <h1>Parametres</h1>
        <p>Centralisez les informations du salon, horaires, moyens de paiement et notifications.</p>
      </header>

      <section className="admin-card settings-card">
        <form className="admin-form settings-form">
          <div className="form-two">
            <label>
              Nom du salon
              <input value={salon.nom} onChange={(event) => changer("nom", event.target.value)} />
            </label>
            <label>
              Email
              <input value={salon.email} onChange={(event) => changer("email", event.target.value)} />
            </label>
          </div>
          <div className="form-two">
            <label>
              Telephone
              <input value={salon.telephone} onChange={(event) => changer("telephone", event.target.value)} />
            </label>
            <label>
              Adresse
              <input value={salon.adresse} onChange={(event) => changer("adresse", event.target.value)} />
            </label>
          </div>
          <div className="form-two">
            <label>
              Ouverture
              <input value={salon.ouverture} onChange={(event) => changer("ouverture", event.target.value)} />
            </label>
            <label>
              Fermeture
              <input value={salon.fermeture} onChange={(event) => changer("fermeture", event.target.value)} />
            </label>
          </div>
          <label>
            Methode de paiement
            <select value={salon.paiement} onChange={(event) => changer("paiement", event.target.value)}>
              <option>Simulation</option>
              <option>Especes au salon</option>
              <option>Mobile money</option>
            </select>
          </label>
          <label className="check-line">
            <input type="checkbox" checked={salon.notifications} onChange={(event) => changer("notifications", event.target.checked)} />
            Recevoir les notifications de rendez-vous et paiement
          </label>
          <button className="btn-primary" type="button">
            Enregistrer les parametres
          </button>
        </form>
      </section>
    </div>
  );
}

export default AdminSettings;
