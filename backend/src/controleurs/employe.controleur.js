const { Employe, RendezVous, Utilisateur, Service } = require("../modeles");

const inclureEmploye = [
  { model: Utilisateur, as: "utilisateur", attributes: ["id", "nom", "email", "telephone", "role"] },
  { model: Service, as: "competences", attributes: ["id", "nom", "prix", "duree"], through: { attributes: [] } },
];

const listerEmployes = async (req, res, next) => {
  try {
    const employes = await Employe.findAll({ include: inclureEmploye, order: [["creeLe", "DESC"]] });
    res.json(employes);
  } catch (erreur) {
    next(erreur);
  }
};

const creerEmploye = async (req, res, next) => {
  try {
    const { competences = [], ...donnees } = req.body;
    const employe = await Employe.create(donnees);
    if (competences.length) await employe.setCompetences(competences);
    const resultat = await Employe.findByPk(employe.id, { include: inclureEmploye });
    res.status(201).json(resultat);
  } catch (erreur) {
    next(erreur);
  }
};

const modifierEmploye = async (req, res, next) => {
  try {
    const employe = await Employe.findByPk(req.params.id);
    if (!employe) {
      res.status(404);
      throw new Error("Employe introuvable");
    }
    const { competences, ...donnees } = req.body;
    await employe.update(donnees);
    if (competences) await employe.setCompetences(competences);
    const resultat = await Employe.findByPk(employe.id, { include: inclureEmploye });
    res.json(resultat);
  } catch (erreur) {
    next(erreur);
  }
};

const supprimerEmploye = async (req, res, next) => {
  try {
    const employe = await Employe.findByPk(req.params.id);
    if (!employe) {
      res.status(404);
      throw new Error("Employe introuvable");
    }
    await employe.destroy();
    res.json({ message: "Employe supprime" });
  } catch (erreur) {
    next(erreur);
  }
};

const rendezVousEmploye = async (req, res, next) => {
  try {
    const rendezVous = await RendezVous.findAll({
      where: { employeId: req.params.id },
      include: [
        { model: Utilisateur, as: "client", attributes: ["id", "nom", "email", "telephone"] },
        { model: Service, as: "service", attributes: ["id", "nom", "prix", "duree"] },
      ],
      order: [["date", "ASC"], ["heure", "ASC"]],
    });
    res.json(rendezVous);
  } catch (erreur) {
    next(erreur);
  }
};

module.exports = { listerEmployes, creerEmploye, modifierEmploye, supprimerEmploye, rendezVousEmploye };
