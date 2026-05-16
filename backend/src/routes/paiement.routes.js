const express = require("express");
const { creerPaiement, listerPaiements } = require("../controleurs/paiement.controleur");
const { proteger } = require("../middlewares/auth.middleware");
const { autoriserRoles } = require("../middlewares/role.middleware");

const router = express.Router();

router.post("/", proteger, autoriserRoles("client", "admin"), creerPaiement);
router.get("/", proteger, autoriserRoles("admin"), listerPaiements);

module.exports = router;
