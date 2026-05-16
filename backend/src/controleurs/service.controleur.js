const { Service } = require("../modeles");

const listerServices = async (req, res, next) => {
  try {
    const filtre = req.utilisateur?.role === "admin" ? {} : { estActif: true };
    const services = await Service.findAll({ where: filtre, order: [["creeLe", "DESC"]] });
    res.json(services);
  } catch (erreur) {
    next(erreur);
  }
};

const creerService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (erreur) {
    next(erreur);
  }
};

const modifierService = async (req, res, next) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      res.status(404);
      throw new Error("Service introuvable");
    }
    await service.update(req.body);
    res.json(service);
  } catch (erreur) {
    next(erreur);
  }
};

const supprimerService = async (req, res, next) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      res.status(404);
      throw new Error("Service introuvable");
    }
    await service.destroy();
    res.json({ message: "Service supprime" });
  } catch (erreur) {
    next(erreur);
  }
};

module.exports = { listerServices, creerService, modifierService, supprimerService };
