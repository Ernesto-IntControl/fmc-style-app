const { DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/bd");

const Paiement = sequelize.define(
  "Paiement",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    rendezVousId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    montant: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    remiseAppliquee: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    montantFinal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    methode: { type: DataTypes.STRING(80), defaultValue: "simulation" },
    statut: { type: DataTypes.ENUM("en_attente", "complete", "echoue"), defaultValue: "en_attente" },
  },
  { tableName: "paiements", timestamps: true, createdAt: "creeLe", updatedAt: "modifieLe" }
);

module.exports = Paiement;
