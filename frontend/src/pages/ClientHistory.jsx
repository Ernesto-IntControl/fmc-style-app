import { useEffect, useState } from "react";
import { getMyAppointments } from "../services/appointmentService";

const lignesDemo = [
  { date: "12 Sep 2026", service: "Manucure russe", employe: "Amandine", prix: "65 $" },
  { date: "28 Aout 2026", service: "Drainage lymphatique", employe: "Julia", prix: "150 $" },
  { date: "05 Aout 2026", service: "Peeling glycolique", employe: "Sophia", prix: "120 $" },
];

function ClientHistory() {
  const [rendezVous, setRendezVous] = useState([]);

  useEffect(() => {
    getMyAppointments().then(setRendezVous).catch(() => setRendezVous([]));
  }, []);

  const lignes = rendezVous.length
    ? rendezVous.map((rdv) => ({
        date: rdv.date,
        service: rdv.service?.nom || "Soin FMC Style",
        employe: rdv.employe?.utilisateur?.nom || "Equipe FMC Style",
        prix: `${Number(rdv.service?.prix || 0).toFixed(0)} $`,
      }))
    : lignesDemo;

  return (
    <div className="client-page">
      <header className="client-heading compact">
        <p className="eyebrow">Votre parcours beaute</p>
        <h1>Historique des soins</h1>
        <p>Consultez les prestations passees, les praticiens et les recus associes.</p>
      </header>

      <section className="client-card">
        <div className="client-table history-table">
          <div className="client-table-row head">
            <span>Date</span>
            <span>Service</span>
            <span>Employe</span>
            <span>Prix</span>
            <span>Recu</span>
          </div>
          {lignes.map((ligne) => (
            <div className="client-table-row" key={`${ligne.date}-${ligne.service}`}>
              <span>{ligne.date}</span>
              <strong>{ligne.service}</strong>
              <span>{ligne.employe}</span>
              <span>{ligne.prix}</span>
              <button type="button">Voir</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ClientHistory;
