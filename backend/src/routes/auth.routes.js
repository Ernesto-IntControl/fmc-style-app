const express = require("express");
const { inscrire, connecter, profil } = require("../controleurs/auth.controleur");
const { proteger } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", inscrire);
router.post("/login", connecter);
router.get("/me", proteger, profil);

module.exports = router;
