require("dotenv").config();

const { sequelize, connecterBD } = require("../configuration/bd");
const { Utilisateur, Service, Employe, Promotion } = require("../modeles");

const initialiser = async () => {
  await connecterBD();
  await sequelize.sync({ force: true });

  const admin = await Utilisateur.create({
    nom: "Eleonore Bennett",
    email: "admin@fmc-style.test",
    telephone: "+243 000 000 001",
    motDePasse: "password",
    role: "admin",
  });

  const client = await Utilisateur.create({
    nom: "Claire Laurent",
    email: "client@fmc-style.test",
    telephone: "+243 000 000 002",
    motDePasse: "password",
    role: "client",
  });

  const employeUser = await Utilisateur.create({
    nom: "Sofia Valenti",
    email: "sofia@fmc-style.test",
    telephone: "+243 000 000 003",
    motDePasse: "password",
    role: "employe",
  });

  const services = await Service.bulkCreate(
    [
      {
        nom: "Tresses signature",
        description: "Tresses elegantes adaptees au style souhaite par la cliente.",
        prix: 85,
        duree: 120,
        image: "/uploads/demo-tresses.jpg",
      },
      {
        nom: "Soin du visage eclat",
        description: "Nettoyage profond et rituel hydratant pour une peau lumineuse.",
        prix: 120,
        duree: 60,
        image: "/uploads/demo-visage.jpg",
      },
      {
        nom: "Manucure spa",
        description: "Soin complet des mains avec finition minimaliste.",
        prix: 45,
        duree: 45,
        image: "/uploads/demo-manucure.jpg",
      },
    ],
    { returning: true }
  );

  const employe = await Employe.create({
    utilisateurId: employeUser.id,
    titrePoste: "Tresseuse",
    joursTravail: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    heureDebut: "09:00",
    heureFin: "18:00",
  });
  await employe.setCompetences([services[0].id, services[1].id]);

  const promotion = await Promotion.create({
    titre: "Bienvenue FMC Style",
    description: "Remise de bienvenue pour les nouveaux clients.",
    typeRemise: "pourcentage",
    valeur: 10,
    estActive: true,
  });
  await promotion.setServices(services.map((service) => service.id));

  console.log("Donnees de demonstration creees");
  console.log("Admin :", admin.email, "/ password");
  console.log("Client :", client.email, "/ password");
  process.exit(0);
};

initialiser().catch((erreur) => {
  console.error(erreur);
  process.exit(1);
});
