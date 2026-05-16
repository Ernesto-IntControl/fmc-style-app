const { DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/bd");

const Conversation = sequelize.define(
  "Conversation",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    utilisateurId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    messages: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    contexte: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
  },
  { tableName: "conversations", timestamps: true, createdAt: "creeLe", updatedAt: "modifieLe" }
);

module.exports = Conversation;
