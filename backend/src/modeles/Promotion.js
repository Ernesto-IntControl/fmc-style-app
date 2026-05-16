const { DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/bd");

const Promotion = sequelize.define(
  "Promotion",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    titre: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.TEXT },
    typeRemise: { type: DataTypes.ENUM("pourcentage", "fixe"), allowNull: false },
    valeur: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    dateDebut: { type: DataTypes.DATEONLY },
    dateFin: { type: DataTypes.DATEONLY },
    estActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    image: { type: DataTypes.STRING(255) },
  },
  { tableName: "promotions", timestamps: true, createdAt: "creeLe", updatedAt: "modifieLe" }
);

module.exports = Promotion;
