const { DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/bd");

const Employe = sequelize.define(
  "Employe",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    utilisateurId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    titrePoste: { type: DataTypes.STRING(120), allowNull: false },
    joursTravail: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    heureDebut: { type: DataTypes.STRING(5), defaultValue: "09:00" },
    heureFin: { type: DataTypes.STRING(5), defaultValue: "18:00" },
    estActif: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "employes", timestamps: true, createdAt: "creeLe", updatedAt: "modifieLe" }
);

module.exports = Employe;
