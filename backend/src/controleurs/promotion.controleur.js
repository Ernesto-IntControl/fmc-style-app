const { Promotion, Service } = require("../modeles");

const inclureServices = [{ model: Service, as: "services", attributes: ["id", "nom", "prix"], through: { attributes: [] } }];

const listerPromotions = async (req, res, next) => {
  try {
    const promotions = await Promotion.findAll({ include: inclureServices, order: [["creeLe", "DESC"]] });
    res.json(promotions);
  } catch (erreur) {
    next(erreur);
  }
};

const creerPromotion = async (req, res, next) => {
  try {
    const { servicesIds = [], ...donnees } = req.body;
    const promotion = await Promotion.create(donnees);
    if (servicesIds.length) await promotion.setServices(servicesIds);
    res.status(201).json(await Promotion.findByPk(promotion.id, { include: inclureServices }));
  } catch (erreur) {
    next(erreur);
  }
};

const modifierPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByPk(req.params.id);
    if (!promotion) {
      res.status(404);
      throw new Error("Promotion introuvable");
    }
    const { servicesIds, ...donnees } = req.body;
    await promotion.update(donnees);
    if (servicesIds) await promotion.setServices(servicesIds);
    res.json(await Promotion.findByPk(promotion.id, { include: inclureServices }));
  } catch (erreur) {
    next(erreur);
  }
};

const supprimerPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByPk(req.params.id);
    if (!promotion) {
      res.status(404);
      throw new Error("Promotion introuvable");
    }
    await promotion.destroy();
    res.json({ message: "Promotion supprimee" });
  } catch (erreur) {
    next(erreur);
  }
};

module.exports = { listerPromotions, creerPromotion, modifierPromotion, supprimerPromotion };
