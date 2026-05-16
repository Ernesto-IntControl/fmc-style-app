const { Op } = require("sequelize");
const { Employe, RendezVous, Utilisateur, Service } = require("../modeles");

const CRENEAUX_FIXES = ["09:00", "11:00", "14:00", "16:00"];

const jourEnFrancais = (dateTexte) => {
  const date = new Date(`${dateTexte}T00:00:00`);
  return date.toLocaleDateString("fr-FR", { weekday: "long" });
};

const trouverDisponibilites = async ({ date, serviceId }) => {
  if (!date || !serviceId) {
    throw new Error("La date et le service sont obligatoires");
  }

  const jour = jourEnFrancais(date);
  const employesTous = await Employe.findAll({
    where: { estActif: true },
    include: [
      { model: Utilisateur, as: "utilisateur", attributes: ["id", "nom", "email", "telephone"] },
      {
        model: Service,
        as: "competences",
        attributes: ["id", "nom"],
        through: { attributes: [] },
        where: { id: serviceId },
      },
    ],
  });

  const employes = employesTous.filter((employe) => {
    const jours = employe.joursTravail || [];
    return jours.length === 0 || jours.includes(jour);
  });

  const rendezVous = await RendezVous.findAll({
    where: {
      date,
      statut: { [Op.ne]: "annule" },
      employeId: { [Op.in]: employes.map((employe) => employe.id) },
    },
  });

  const creneaux = CRENEAUX_FIXES.map((heure) => {
    const employeDisponible = employes.find((employe) => {
      const dejaPris = rendezVous.some(
        (rdv) => String(rdv.employeId) === String(employe.id) && rdv.heure === heure
      );
      return !dejaPris;
    });

    return {
      heure,
      disponible: Boolean(employeDisponible),
      employeId: employeDisponible?.id || null,
      employe: employeDisponible || null,
    };
  });

  return { date, serviceId, creneaux };
};

const trouverEmployeDisponible = async ({ date, heure, serviceId }) => {
  const disponibilites = await trouverDisponibilites({ date, serviceId });
  const creneau = disponibilites.creneaux.find((item) => item.heure === heure && item.disponible);

  if (!creneau) {
    const autre = disponibilites.creneaux.find((item) => item.disponible);
    const message = autre
      ? `Ce creneau est indisponible. Essayez plutot ${autre.heure}.`
      : "Aucun employe disponible pour cette date.";
    throw new Error(message);
  }

  return creneau.employeId;
};

module.exports = { CRENEAUX_FIXES, trouverDisponibilites, trouverEmployeDisponible };
