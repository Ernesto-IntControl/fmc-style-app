const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "fmc_style",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: process.env.SQL_LOGGING === "true" ? console.log : false,
  }
);

const connecterBD = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connecte");
  } catch (erreur) {
    console.error("Erreur de connexion MySQL :", erreur.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connecterBD };
