const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const routesAuth = require("./routes/auth.routes");
const routesServices = require("./routes/service.routes");
const routesEmployes = require("./routes/employe.routes");
const routesRendezVous = require("./routes/rendezVous.routes");
const routesDisponibilites = require("./routes/disponibilite.routes");
const routesPromotions = require("./routes/promotion.routes");
const routesPaiements = require("./routes/paiement.routes");
const routesChat = require("./routes/chat.routes");
const routesUpload = require("./routes/upload.routes");
const { routeIntrouvable, gererErreur } = require("./middlewares/erreur.middleware");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/api/sante", (req, res) => {
  res.json({ message: "API FMC Style operationnelle" });
});

app.use("/api/auth", routesAuth);
app.use("/api/services", routesServices);
app.use("/api/employees", routesEmployes);
app.use("/api/appointments", routesRendezVous);
app.use("/api/availability", routesDisponibilites);
app.use("/api/promotions", routesPromotions);
app.use("/api/payments", routesPaiements);
app.use("/api/chat", routesChat);
app.use("/api/upload", routesUpload);

app.use(routeIntrouvable);
app.use(gererErreur);

module.exports = app;
