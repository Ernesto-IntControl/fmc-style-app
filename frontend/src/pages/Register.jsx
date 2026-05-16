import { useState } from "react";
import { register } from "../services/authService";

function Register({ setPage, setUtilisateur }) {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", motDePasse: "", role: "client" });
  const [erreur, setErreur] = useState("");

  const changer = (champ, valeur) => setForm({ ...form, [champ]: valeur });

  const soumettre = async (event) => {
    event.preventDefault();
    setErreur("");
    try {
      const utilisateur = await register(form);
      setUtilisateur(utilisateur);
      setPage("booking");
    } catch (error) {
      setErreur(error.message);
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-visual">
        <strong>FMC STYLE</strong>
        <h1>Entrez dans votre sanctuaire de beaute.</h1>
      </div>
      <div className="auth-content">
        <form className="form-panel" onSubmit={soumettre}>
          <p className="eyebrow">Creer un compte</p>
          <h1>Inscription client</h1>
          {erreur && <p className="error">{erreur}</p>}
          <div className="form">
            <div className="field">
              <label>Nom complet</label>
              <input value={form.nom} onChange={(e) => changer("nom", e.target.value)} required />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => changer("email", e.target.value)} required />
            </div>
            <div className="field">
              <label>Telephone</label>
              <input value={form.telephone} onChange={(e) => changer("telephone", e.target.value)} />
            </div>
            <div className="field">
              <label>Mot de passe</label>
              <input type="password" value={form.motDePasse} onChange={(e) => changer("motDePasse", e.target.value)} required />
            </div>
            <button className="btn-primary" type="submit">
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
