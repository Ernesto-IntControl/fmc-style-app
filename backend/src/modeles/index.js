const Utilisateur = require("./Utilisateur");
const Service = require("./Service");
const Employe = require("./Employe");
const RendezVous = require("./RendezVous");
const Promotion = require("./Promotion");
const Paiement = require("./Paiement");
const Conversation = require("./Conversation");

Utilisateur.hasOne(Employe, { foreignKey: "utilisateurId", as: "ficheEmploye", onDelete: "CASCADE" });
Employe.belongsTo(Utilisateur, { foreignKey: "utilisateurId", as: "utilisateur" });

Employe.belongsToMany(Service, {
  through: "competences_employes",
  foreignKey: "employeId",
  otherKey: "serviceId",
  as: "competences",
});
Service.belongsToMany(Employe, {
  through: "competences_employes",
  foreignKey: "serviceId",
  otherKey: "employeId",
  as: "employesCompetents",
});

Utilisateur.hasMany(RendezVous, { foreignKey: "clientId", as: "rendezVousClient" });
RendezVous.belongsTo(Utilisateur, { foreignKey: "clientId", as: "client" });
Service.hasMany(RendezVous, { foreignKey: "serviceId", as: "rendezVous" });
RendezVous.belongsTo(Service, { foreignKey: "serviceId", as: "service" });
Employe.hasMany(RendezVous, { foreignKey: "employeId", as: "rendezVous" });
RendezVous.belongsTo(Employe, { foreignKey: "employeId", as: "employe" });

Promotion.belongsToMany(Service, {
  through: "promotions_services",
  foreignKey: "promotionId",
  otherKey: "serviceId",
  as: "services",
});
Service.belongsToMany(Promotion, {
  through: "promotions_services",
  foreignKey: "serviceId",
  otherKey: "promotionId",
  as: "promotions",
});

RendezVous.hasOne(Paiement, { foreignKey: "rendezVousId", as: "paiement" });
Paiement.belongsTo(RendezVous, { foreignKey: "rendezVousId", as: "rendezVous" });

Utilisateur.hasMany(Conversation, { foreignKey: "utilisateurId", as: "conversations" });
Conversation.belongsTo(Utilisateur, { foreignKey: "utilisateurId", as: "utilisateur" });

module.exports = { Utilisateur, Service, Employe, RendezVous, Promotion, Paiement, Conversation };
