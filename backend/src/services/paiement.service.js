const { Paiement, RendezVous } = require("../modeles");

const simulerPaiement = async ({ rendezVousId, montant, remiseAppliquee = 0, methode = "simulation" }) => {
  const montantFinal = Math.max(Number(montant) - Number(remiseAppliquee), 0);

  const paiement = await Paiement.create({
    rendezVousId,
    montant,
    remiseAppliquee,
    montantFinal,
    methode,
    statut: "complete",
  });

  await RendezVous.update({
    statut: "confirme",
    statutPaiement: "paye",
  }, { where: { id: rendezVousId } });

  return paiement;
};

module.exports = { simulerPaiement };
