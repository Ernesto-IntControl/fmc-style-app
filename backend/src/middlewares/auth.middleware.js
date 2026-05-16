const jwt = require("jsonwebtoken");
const { Utilisateur } = require("../modeles");

const proteger = async (req, res, next) => {
  try {
    const entete = req.headers.authorization;

    if (!entete || !entete.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Acces refuse, jeton manquant");
    }

    const jeton = entete.split(" ")[1];
    const decode = jwt.verify(jeton, process.env.JWT_SECRET || "secret_de_developpement");
    const utilisateur = await Utilisateur.findByPk(decode.id, {
      attributes: { exclude: ["motDePasse"] },
    });

    if (!utilisateur) {
      res.status(401);
      throw new Error("Utilisateur introuvable");
    }

    req.utilisateur = utilisateur;
    next();
  } catch (erreur) {
    next(erreur);
  }
};

module.exports = { proteger };
