require("dotenv").config();

const app = require("./app");
const { sequelize, connecterBD } = require("./configuration/bd");
require("./modeles");

const port = process.env.PORT || 5000;

connecterBD().then(async () => {
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Serveur lance sur http://localhost:${port}`);
  });
});
