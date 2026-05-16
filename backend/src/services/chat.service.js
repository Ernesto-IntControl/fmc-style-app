const { Service } = require("../modeles");
const { CRENEAUX_FIXES } = require("./disponibilite.service");

const extraireDate = (texte) => {
  const contenu = texte.toLowerCase();
  const aujourdHui = new Date();

  if (contenu.includes("demain")) {
    const demain = new Date(aujourdHui);
    demain.setDate(aujourdHui.getDate() + 1);
    return demain.toISOString().slice(0, 10);
  }

  if (contenu.includes("aujourd")) {
    return aujourdHui.toISOString().slice(0, 10);
  }

  const iso = contenu.match(/\b\d{4}-\d{2}-\d{2}\b/);
  return iso ? iso[0] : null;
};

const extraireHeure = (texte) => {
  const correspondance = texte.match(/\b(09|9|11|14|16)[:h]?(00)?\b/);
  if (!correspondance) return null;
  const heure = correspondance[1].padStart(2, "0");
  return `${heure}:00`;
};

const identifierService = async (texte) => {
  const services = await Service.findAll({ where: { estActif: true } });
  const contenu = texte.toLowerCase();

  return services.find((service) => {
    const nom = service.nom.toLowerCase();
    return contenu.includes(nom) || nom.split(" ").some((mot) => mot.length > 3 && contenu.includes(mot));
  });
};

const repondreAssistant = async ({ message, contexte = {} }) => {
  const service = await identifierService(message);
  const date = extraireDate(message);
  const heure = extraireHeure(message);

  const nouveauContexte = {
    serviceId: service?.id || contexte.serviceId,
    date: date || contexte.date,
    heure: heure || contexte.heure,
  };

  if (!nouveauContexte.serviceId) {
    return {
      reponse:
        "Avec plaisir. Quel service souhaitez-vous reserver ? Par exemple : tresses, maquillage, soin du visage ou manucure.",
      contexte: nouveauContexte,
    };
  }

  if (!nouveauContexte.date) {
    return {
      reponse: "Tres bon choix. Pour quelle date souhaitez-vous venir ? Vous pouvez dire demain ou ecrire YYYY-MM-DD.",
      contexte: nouveauContexte,
    };
  }

  if (!nouveauContexte.heure) {
    return {
      reponse: `Voici nos creneaux habituels : ${CRENEAUX_FIXES.join(", ")}. Quelle heure preferez-vous ?`,
      contexte: nouveauContexte,
    };
  }

  return {
    reponse:
      "Parfait. J'ai les informations principales. Vous pouvez maintenant confirmer la reservation et ajouter vos photos d'inspiration si besoin.",
    contexte: nouveauContexte,
  };
};

module.exports = { repondreAssistant };
