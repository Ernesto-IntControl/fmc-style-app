import { useState } from "react";

function ClientProfile({ utilisateur }) {
  const [form, setForm] = useState({
    nom: utilisateur?.nom || "",
    email: utilisateur?.email || "",
    telephone: utilisateur?.telephone || "",
  });

  const changer = (champ, valeur) => setForm((actuel) => ({ ...actuel, [champ]: valeur }));

  return (
    <div className="client-page">
      <header className="client-heading compact">
        <p className="eyebrow">Informations personnelles</p>
        <h1>Profil</h1>
        <p>Gardez vos informations de contact a jour pour recevoir les confirmations de rendez-vous.</p>
      </header>

      <section className="client-card profile-card">
        <form className="form">
          <div className="field">
            <label>Nom complet</label>
            <input value={form.nom} onChange={(event) => changer("nom", event.target.value)} />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" value={form.email} onChange={(event) => changer("email", event.target.value)} />
          </div>
          <div className="field">
            <label>Telephone</label>
            <input value={form.telephone} onChange={(event) => changer("telephone", event.target.value)} />
          </div>
          <button className="btn-primary" type="button">
            Modifier
          </button>
        </form>
      </section>
    </div>
  );
}

export default ClientProfile;
