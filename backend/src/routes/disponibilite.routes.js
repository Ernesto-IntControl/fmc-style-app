const express = require("express");
const { disponibilites } = require("../controleurs/rendezVous.controleur");

const router = express.Router();

router.get("/", disponibilites);

module.exports = router;
