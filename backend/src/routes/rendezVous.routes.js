const express = require("express");
const {
  listerRendezVous,
  mesRendezVous,
  creerRendezVous,
  modifierStatut,
  supprimerRendezVous,
} = require("../controleurs/rendezVous.controleur");
const { proteger } = require("../middlewares/auth.middleware");
const { autoriserRoles } = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", proteger, autoriserRoles("admin"), listerRendezVous);
router.get("/my", proteger, mesRendezVous);
router.post("/", proteger, autoriserRoles("client", "admin"), creerRendezVous);
router.put("/:id/status", proteger, autoriserRoles("admin", "employe"), modifierStatut);
router.delete("/:id", proteger, autoriserRoles("admin"), supprimerRendezVous);

module.exports = router;
