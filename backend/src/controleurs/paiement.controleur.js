const { Paiement, RendezVous, Utilisateur, Service } = require("../modeles");
const { simulerPaiement } = require("../services/paiement.service");

const creerPaiement = async (req, res, next) => {
  try {
    const { rendezVousId, remiseAppliquee = 0, methode = "simulation" } = req.body;
    const rendezVous = await RendezVous.findByPk(rendezVousId, {
      include: [{ model: Service, as: "service", attributes: ["id", "prix"] }],
    });

    if (!rendezVous) {
      res.status(404);
      throw new Error("Rendez-vous introuvable");
    }

    const paiement = await simulerPaiement({
      rendezVousId,
      montant: rendezVous.service.prix,
      remiseAppliquee,
      methode,
    });

    res.status(201).json(paiement);
  } catch (erreur) {
    next(erreur);
  }
};

const listerPaiements = async (req, res, next) => {
  try {
    const paiements = await Paiement.findAll({
      include: [
        {
          model: RendezVous,
          as: "rendezVous",
          include: [
            { model: Utilisateur, as: "client", attributes: ["id", "nom", "email"] },
            { model: Service, as: "service" },
          ],
        },
      ],
      order: [["creeLe", "DESC"]],
    });
    res.json(paiements);
  } catch (erreur) {
    next(erreur);
  }
};

module.exports = { creerPaiement, listerPaiements };
