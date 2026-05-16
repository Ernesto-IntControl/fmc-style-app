const { DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/bd");

const Service = sequelize.define(
  "Service",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    prix: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    duree: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    image: { type: DataTypes.STRING(255) },
    estActif: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "services", timestamps: true, createdAt: "creeLe", updatedAt: "modifieLe" }
);

module.exports = Service;
