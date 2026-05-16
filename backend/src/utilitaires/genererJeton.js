const jwt = require("jsonwebtoken");

const genererJeton = (utilisateur) => {
  return jwt.sign(
    { id: utilisateur.id, role: utilisateur.role },
    process.env.JWT_SECRET || "secret_de_developpement",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

module.exports = genererJeton;
