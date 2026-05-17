export const statutRdv = {
  en_attente: "En attente",
  confirme: "Confirme",
  en_cours: "En cours",
  termine: "Termine",
  annule: "Annule",
};

export const statutPaiement = {
  en_attente: "En attente",
  paye: "Paye",
  complete: "Paye",
  echoue: "Echoue",
  rembourse: "Rembourse",
};

export const formatPrix = (valeur) => `${Number(valeur || 0).toFixed(0)} $`;

export const dateAujourdhui = () => new Date().toISOString().slice(0, 10);

export const nomClient = (rdv) => rdv?.client?.nom || "Client FMC STYLE";

export const nomEmploye = (rdv) => rdv?.employe?.utilisateur?.nom || "Equipe FMC STYLE";

export const categorieService = (service) => {
  const texte = `${service?.nom || ""} ${service?.description || ""}`.toLowerCase();
  if (texte.includes("manucure") || texte.includes("ongle") || texte.includes("pedicure")) return "manucure";
  if (texte.includes("maquillage")) return "maquillage";
  if (texte.includes("visage") || texte.includes("peeling") || texte.includes("soin")) return "soins visage";
  return "coiffure";
};

export const servicesEmploye = (employe) =>
  employe?.competences?.length ? employe.competences.map((service) => service.nom).join(", ") : "Competences a definir";

export const extraireClients = (rendezVous) => {
  const map = new Map();
  rendezVous.forEach((rdv) => {
    if (!rdv.client?.id) return;
    const actuel = map.get(rdv.client.id) || {
      ...rdv.client,
      visites: 0,
      total: 0,
      dernierRdv: rdv.date,
      inspirations: 0,
    };
    actuel.visites += 1;
    actuel.total += Number(rdv.service?.prix || 0);
    actuel.dernierRdv = rdv.date > actuel.dernierRdv ? rdv.date : actuel.dernierRdv;
    actuel.inspirations += Array.isArray(rdv.imagesInspiration) ? rdv.imagesInspiration.length : 0;
    map.set(rdv.client.id, actuel);
  });
  return Array.from(map.values());
};

export const filtrerTexte = (liste, recherche, champs) => {
  const terme = recherche.trim().toLowerCase();
  if (!terme) return liste;
  return liste.filter((item) => champs.some((champ) => String(champ(item) || "").toLowerCase().includes(terme)));
};
