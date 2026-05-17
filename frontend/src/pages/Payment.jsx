import { useState } from "react";
import reception from "../assets/reception.png";
import { payAppointment } from "../services/appointmentService";

function Payment({ reservation, setReservation, setPage }) {
  const [erreur, setErreur] = useState("");
  const rendezVous = reservation?.rendezVous;
  const service = reservation?.service || rendezVous?.service;

  const payer = async () => {
    setErreur("");
    try {
      const paiement = await payAppointment({ rendezVousId: rendezVous.id, remiseAppliquee: 0, methode: "simulation" });
      setReservation({ ...reservation, paiement });
      setPage("confirmation");
    } catch (error) {
      setErreur(error.message);
    }
  };

  if (!rendezVous) {
    return (
      <section className="page-hero">
        <h1>Aucune reservation en cours</h1>
        <button className="btn-primary" onClick={() => setPage("booking")}>
          Commencer une reservation
        </button>
      </section>
    );
  }

  return (
    <div className="payment-page">
      <section className="payment-heading">
        <p className="eyebrow">Paiement securise</p>
        <h1>Finalisez votre reservation</h1>
        <p>Confirmez le paiement simule pour valider le rendez-vous dans les espaces admin et employe.</p>
      </section>
      <section className="payment-layout">
        <div className="form-panel payment-form-panel">
          {erreur && <p className="error">{erreur}</p>}
          <div className="payment-methods">
            <button type="button">Apple Pay</button>
            <button type="button">Google Pay</button>
          </div>
          <div className="form">
            <div className="field">
              <label>Nom sur la carte</label>
              <input defaultValue="CLIENT FMC STYLE" />
            </div>
            <div className="field">
              <label>Numero de carte</label>
              <input defaultValue="0000 0000 0000 0000" />
            </div>
            <div className="payment-fields">
              <div className="field">
                <label>Date d'expiration</label>
                <input defaultValue="MM / AA" />
              </div>
              <div className="field">
                <label>CVC</label>
                <input defaultValue="123" />
              </div>
            </div>
            <button className="btn-primary" onClick={payer} type="button">
              Confirmer le paiement
            </button>
          </div>
        </div>
        <aside className="summary-card">
          <img src={reception} alt="Reception FMC Style" />
          <h2>Recapitulatif</h2>
          <div className="summary-row">
            <span>Service</span>
            <strong>{service?.nom}</strong>
          </div>
          <div className="summary-row">
            <span>Date</span>
            <strong>{rendezVous.date}</strong>
          </div>
          <div className="summary-row">
            <span>Total</span>
            <strong className="summary-total">{Number(service?.prix || 0).toFixed(0)} $</strong>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default Payment;
