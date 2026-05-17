import { useEffect, useMemo, useState } from "react";
import { getAdminData } from "../services/adminService";
import { formatPrix, nomClient } from "./adminUtils";

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filtre, setFiltre] = useState("");

  useEffect(() => {
    getAdminData()
      .then((donnees) => {
        const rdv = donnees.rendezVous.slice(0, 4).map((item) => ({
          id: `rdv-${item.id}`,
          type: "nouveau rendez-vous",
          titre: `${nomClient(item)} - ${item.service?.nom || "Service"}`,
          lu: item.statut !== "en_attente",
        }));
        const paiements = donnees.paiements.slice(0, 4).map((item) => ({
          id: `pay-${item.id}`,
          type: "paiement recu",
          titre: `${item.rendezVous?.client?.nom || "Client"} - ${formatPrix(item.montantFinal)}`,
          lu: false,
        }));
        const promotions = donnees.promotions
          .filter((item) => item.estActive)
          .slice(0, 2)
          .map((item) => ({ id: `promo-${item.id}`, type: "promotion active", titre: item.titre, lu: true }));
        setNotifications([...rdv, ...paiements, ...promotions]);
      })
      .catch(() => setNotifications([]));
  }, []);

  const liste = useMemo(() => (filtre ? notifications.filter((item) => item.type === filtre) : notifications), [notifications, filtre]);

  const marquerLu = (id) => setNotifications((actuelles) => actuelles.map((item) => (item.id === id ? { ...item, lu: true } : item)));
  const supprimer = (id) => setNotifications((actuelles) => actuelles.filter((item) => item.id !== id));

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <p className="eyebrow">Centre de controle</p>
        <h1>Notifications</h1>
        <p>Suivez les reservations, annulations, paiements recus, campagnes et alertes d'equipe.</p>
      </header>

      <section className="admin-card admin-toolbar">
        <select value={filtre} onChange={(event) => setFiltre(event.target.value)}>
          <option value="">Tous les types</option>
          <option value="nouveau rendez-vous">Nouveau rendez-vous</option>
          <option value="paiement recu">Paiement recu</option>
          <option value="promotion active">Promotion active</option>
        </select>
      </section>

      <section className="notification-list">
        {liste.map((notification) => (
          <article className={`admin-card notification-card ${notification.lu ? "read" : ""}`} key={notification.id}>
            <span>{notification.type}</span>
            <h2>{notification.titre}</h2>
            <p>{notification.lu ? "Marquee comme lue" : "Nouvelle notification a traiter"}</p>
            <div className="table-actions">
              <button type="button" onClick={() => marquerLu(notification.id)}>
                Marquer comme lu
              </button>
              <button type="button" onClick={() => supprimer(notification.id)}>
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default AdminNotifications;
