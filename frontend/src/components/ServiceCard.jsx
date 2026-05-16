import spa from "../assets/spa.png";

function ServiceCard({ service, onReserve }) {
  return (
    <article className="service-card">
      <img src={service.image?.startsWith("/uploads") ? spa : service.image || spa} alt={service.nom} />
      <div className="service-card-body">
        <h3>{service.nom}</h3>
        <p>{service.description}</p>
        <div className="service-meta">
          <span>{Number(service.prix).toFixed(0)} $</span>
          <span>{service.duree} min</span>
        </div>
        <button className="btn-secondary" onClick={() => onReserve(service)}>
          Reserver
        </button>
      </div>
    </article>
  );
}

export default ServiceCard;
