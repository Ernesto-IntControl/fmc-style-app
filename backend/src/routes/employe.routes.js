const express = require("express");
const {
  listerEmployes,
  creerEmploye,
  modifierEmploye,
  supprimerEmploye,
  rendezVousEmploye,
  rendezVousEmployeConnecte,
} = require("../controleurs/employe.controleur");
const { proteger } = require("../middlewares/auth.middleware");
const { autoriserRoles } = require("../middlewares/role.middleware");

const router = express.Router();

router.use(proteger);
router.get("/me/appointments", autoriserRoles("employe"), rendezVousEmployeConnecte);
router.get("/", autoriserRoles("admin"), listerEmployes);
router.post("/", autoriserRoles("admin"), creerEmploye);
router.put("/:id", autoriserRoles("admin"), modifierEmploye);
router.delete("/:id", autoriserRoles("admin"), supprimerEmploye);
router.get("/:id/appointments", autoriserRoles("admin", "employe"), rendezVousEmploye);

module.exports = router;
