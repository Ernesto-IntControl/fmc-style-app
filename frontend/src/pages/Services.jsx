import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { getServices } from "../services/appointmentService";

function Services({ setPage, setReservation }) {
  const [services, setServices] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    getServices().then(setServices).catch((error) => setErreur(error.message));
  }, []);

  const reserver = (service) => {
    setReservation({ service });
    setPage("booking");
  };

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">L'art du soin de soi</p>
        <h1>Choisissez votre rituel</h1>
        <p>Consultez les services, les prix et la duree avant de lancer la reservation.</p>
      </section>
      <section className="section">
        {erreur && <p className="error">{erreur}</p>}
        <div className="service-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onReserve={reserver} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Services;
