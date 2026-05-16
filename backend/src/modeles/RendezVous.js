const { DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/bd");

const RendezVous = sequelize.define(
  "RendezVous",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    clientId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    serviceId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    employeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    heure: { type: DataTypes.STRING(5), allowNull: false },
    statut: {
      type: DataTypes.ENUM("en_attente", "confirme", "annule", "termine"),
      defaultValue: "en_attente",
    },
    statutPaiement: { type: DataTypes.ENUM("en_attente", "paye"), defaultValue: "en_attente" },
    notes: { type: DataTypes.TEXT },
    imagesInspiration: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  },
  {
    tableName: "rendez_vous",
    timestamps: true,
    createdAt: "creeLe",
    updatedAt: "modifieLe",
    indexes: [{ unique: true, fields: ["employeId", "date", "heure"] }],
  }
);

module.exports = RendezVous;
