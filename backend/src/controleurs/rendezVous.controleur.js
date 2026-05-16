const { RendezVous, Utilisateur, Service, Employe } = require("../modeles");
const { trouverDisponibilites, trouverEmployeDisponible } = require("../services/disponibilite.service");

const inclureRendezVous = [
  { model: Utilisateur, as: "client", attributes: ["id", "nom", "email", "telephone"] },
  { model: Service, as: "service", attributes: ["id", "nom", "prix", "duree", "image"] },
  {
    model: Employe,
    as: "employe",
    include: [{ model: Utilisateur, as: "utilisateur", attributes: ["id", "nom", "email", "telephone"] }],
  },
];

const listerRendezVous = async (req, res, next) => {
  try {
    const rendezVous = await RendezVous.findAll({ include: inclureRendezVous, order: [["date", "ASC"], ["heure", "ASC"]] });
    res.json(rendezVous);
  } catch (erreur) {
    next(erreur);
  }
};

const mesRendezVous = async (req, res, next) => {
  try {
    const rendezVous = await RendezVous.findAll({
      where: { clientId: req.utilisateur.id },
      include: inclureRendezVous,
      order: [["date", "ASC"], ["heure", "ASC"]],
    });
    res.json(rendezVous);
  } catch (erreur) {
    next(erreur);
  }
};

const creerRendezVous = async (req, res, next) => {
  try {
    const { serviceId, date, heure, notes, imagesInspiration = [] } = req.body;
    const employeId = await trouverEmployeDisponible({ serviceId, date, heure });

    const rendezVous = await RendezVous.create({
      clientId: req.utilisateur.id,
      serviceId,
      employeId,
      date,
      heure,
      notes,
      imagesInspiration,
    });

    res.status(201).json(await RendezVous.findByPk(rendezVous.id, { include: inclureRendezVous }));
  } catch (erreur) {
    next(erreur);
  }
};

const modifierStatut = async (req, res, next) => {
  try {
    const { statut, statutPaiement } = req.body;
    const rendezVous = await RendezVous.findByPk(req.params.id);

    if (!rendezVous) {
      res.status(404);
      throw new Error("Rendez-vous introuvable");
    }

    await rendezVous.update({ statut, statutPaiement });
    res.json(await RendezVous.findByPk(rendezVous.id, { include: inclureRendezVous }));
  } catch (erreur) {
    next(erreur);
  }
};

const supprimerRendezVous = async (req, res, next) => {
  try {
    const rendezVous = await RendezVous.findByPk(req.params.id);
    if (!rendezVous) {
      res.status(404);
      throw new Error("Rendez-vous introuvable");
    }
    await rendezVous.destroy();
    res.json({ message: "Rendez-vous supprime" });
  } catch (erreur) {
    next(erreur);
  }
};

const disponibilites = async (req, res, next) => {
  try {
    const resultat = await trouverDisponibilites({
      date: req.query.date,
      serviceId: req.query.serviceId,
    });
    res.json(resultat);
  } catch (erreur) {
    next(erreur);
  }
};

module.exports = { listerRendezVous, mesRendezVous, creerRendezVous, modifierStatut, supprimerRendezVous, disponibilites };
