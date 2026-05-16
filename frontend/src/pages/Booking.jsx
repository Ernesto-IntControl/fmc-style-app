import { useEffect, useState } from "react";
import spa from "../assets/spa.png";
import { createAppointment, getAvailability, getServices } from "../services/appointmentService";

const demainIso = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};

function Booking({ reservation, setReservation, setPage }) {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState(reservation?.service?.id || "");
  const [date, setDate] = useState(demainIso());
  const [heure, setHeure] = useState("");
  const [notes, setNotes] = useState("");
  const [creneaux, setCreneaux] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    getServices().then((liste) => {
      setServices(liste);
      if (!serviceId && liste[0]) setServiceId(liste[0].id);
    });
  }, []);

  useEffect(() => {
    if (!serviceId || !date) return;
    getAvailability({ date, serviceId })
      .then((data) => setCreneaux(data.creneaux))
      .catch((error) => setErreur(error.message));
  }, [serviceId, date]);

  const service = services.find((item) => String(item.id) === String(serviceId)) || reservation?.service;

  const soumettre = async (event) => {
    event.preventDefault();
    setErreur("");
    try {
      const rendezVous = await createAppointment({
        serviceId,
        date,
        heure,
        notes,
        imagesInspiration: [],
      });
      setReservation({ service, rendezVous });
      setPage("payment");
    } catch (error) {
      setErreur(error.message);
    }
  };

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Etape 02 - date et heure</p>
        <h1>Choisissez votre moment</h1>
        <p>Le systeme trouve automatiquement un employe competent et disponible.</p>
      </section>
      <form className="booking-layout" onSubmit={soumettre}>
        <div className="form-panel">
          {erreur && <p className="error">{erreur}</p>}
          <div className="form">
            <div className="field">
              <label>Service</label>
              <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} required>
                {services.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nom} - {Number(item.prix).toFixed(0)} $
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="field">
              <label>Heure disponible</label>
              <div className="time-grid">
                {creneaux.map((creneau) => (
                  <button
                    key={creneau.heure}
                    type="button"
                    disabled={!creneau.disponible}
                    className={`time-button ${heure === creneau.heure ? "selected" : ""}`}
                    onClick={() => setHeure(creneau.heure)}
                  >
                    {creneau.heure}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Note ou commentaire</label>
              <textarea rows="5" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Style souhaite, allergies, preferences..." />
            </div>
            <button className="btn-primary" type="submit" disabled={!heure}>
              Continuer vers le paiement
            </button>
          </div>
        </div>
        <aside className="summary-card">
          <img src={spa} alt="Salon FMC Style" />
          <h2>Resume</h2>
          <div className="summary-row">
            <span>Service</span>
            <strong>{service?.nom || "A selectionner"}</strong>
          </div>
          <div className="summary-row">
            <span>Date</span>
            <strong>{date}</strong>
          </div>
          <div className="summary-row">
            <span>Heure</span>
            <strong>{heure || "-"}</strong>
          </div>
          <div className="summary-row">
            <span>Total</span>
            <strong className="summary-total">{service ? Number(service.prix).toFixed(0) : 0} $</strong>
          </div>
        </aside>
      </form>
    </>
  );
}

export default Booking;
