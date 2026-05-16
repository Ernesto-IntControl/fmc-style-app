const express = require("express");
const {
  listerPromotions,
  creerPromotion,
  modifierPromotion,
  supprimerPromotion,
} = require("../controleurs/promotion.controleur");
const { proteger } = require("../middlewares/auth.middleware");
const { autoriserRoles } = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", listerPromotions);
router.post("/", proteger, autoriserRoles("admin"), creerPromotion);
router.put("/:id", proteger, autoriserRoles("admin"), modifierPromotion);
router.delete("/:id", proteger, autoriserRoles("admin"), supprimerPromotion);

module.exports = router;
