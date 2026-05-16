const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../configuration/bd");

const Utilisateur = sequelize.define(
  "Utilisateur",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING(120), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
    telephone: { type: DataTypes.STRING(40) },
    motDePasse: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM("client", "admin", "employe"), defaultValue: "client" },
  },
  {
    tableName: "utilisateurs",
    timestamps: true,
    createdAt: "creeLe",
    updatedAt: "modifieLe",
    hooks: {
      beforeCreate: async (utilisateur) => {
        const sel = await bcrypt.genSalt(10);
        utilisateur.motDePasse = await bcrypt.hash(utilisateur.motDePasse, sel);
      },
      beforeUpdate: async (utilisateur) => {
        if (utilisateur.changed("motDePasse")) {
          const sel = await bcrypt.genSalt(10);
          utilisateur.motDePasse = await bcrypt.hash(utilisateur.motDePasse, sel);
        }
      },
    },
  }
);

Utilisateur.prototype.verifierMotDePasse = function (motDePasse) {
  return bcrypt.compare(motDePasse, this.motDePasse);
};

module.exports = Utilisateur;
