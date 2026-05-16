const express = require("express");
const {
  listerServices,
  creerService,
  modifierService,
  supprimerService,
} = require("../controleurs/service.controleur");
const { proteger } = require("../middlewares/auth.middleware");
const { autoriserRoles } = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", listerServices);
router.post("/", proteger, autoriserRoles("admin"), creerService);
router.put("/:id", proteger, autoriserRoles("admin"), modifierService);
router.delete("/:id", proteger, autoriserRoles("admin"), supprimerService);

module.exports = router;
