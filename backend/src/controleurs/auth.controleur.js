const { Utilisateur } = require("../modeles");
const genererJeton = require("../utilitaires/genererJeton");

const nettoyerUtilisateur = (utilisateur) => ({
  id: utilisateur.id,
  nom: utilisateur.nom,
  email: utilisateur.email,
  telephone: utilisateur.telephone,
  role: utilisateur.role,
  creeLe: utilisateur.creeLe,
});

const inscrire = async (req, res, next) => {
  try {
    const { nom, email, telephone, motDePasse, role } = req.body;

    const existe = await Utilisateur.findOne({ where: { email } });
    if (existe) {
      res.status(400);
      throw new Error("Cet email est deja utilise");
    }

    const utilisateur = await Utilisateur.create({ nom, email, telephone, motDePasse, role });
    res.status(201).json({ utilisateur: nettoyerUtilisateur(utilisateur), jeton: genererJeton(utilisateur) });
  } catch (erreur) {
    next(erreur);
  }
};

const connecter = async (req, res, next) => {
  try {
    const { email, motDePasse } = req.body;
    const utilisateur = await Utilisateur.findOne({ where: { email } });

    if (!utilisateur || !(await utilisateur.verifierMotDePasse(motDePasse))) {
      res.status(401);
      throw new Error("Email ou mot de passe incorrect");
    }

    res.json({ utilisateur: nettoyerUtilisateur(utilisateur), jeton: genererJeton(utilisateur) });
  } catch (erreur) {
    next(erreur);
  }
};

const profil = async (req, res) => {
  res.json({ utilisateur: nettoyerUtilisateur(req.utilisateur) });
};

module.exports = { inscrire, connecter, profil };
