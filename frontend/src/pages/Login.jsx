import { useState } from "react";
import { login } from "../services/authService";

function Login({ setPage, setUtilisateur }) {
  const [form, setForm] = useState({ email: "client@fmc-style.test", motDePasse: "password" });
  const [erreur, setErreur] = useState("");

  const soumettre = async (event) => {
    event.preventDefault();
    setErreur("");
    try {
      const utilisateur = await login(form);
      setUtilisateur(utilisateur);
      setPage(
        utilisateur.role === "admin"
          ? "admin"
          : utilisateur.role === "employee" || utilisateur.role === "employe"
            ? "employee"
            : "client"
      );
    } catch (error) {
      setErreur(error.message);
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-visual">
        <strong>FMC STYLE</strong>
        <h1>Sublimez votre elegance naturelle.</h1>
      </div>
      <div className="auth-content">
        <form className="form-panel" onSubmit={soumettre}>
          <p className="eyebrow">Se connecter</p>
          <h1>Bon retour parmi nous</h1>
          <p>Accedez a votre espace pour reserver et suivre vos rendez-vous.</p>
          {erreur && <p className="error">{erreur}</p>}
          <div className="form">
            <div className="field">
              <label>Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="field">
              <label>Mot de passe</label>
              <input
                type="password"
                value={form.motDePasse}
                onChange={(e) => setForm({ ...form, motDePasse: e.target.value })}
              />
            </div>
            <button className="btn-primary" type="submit">
              Connexion
            </button>
            <button className="btn-light" type="button" onClick={() => setPage("register")}>
              Creer un compte
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
