const express = require("express");
const { discuter } = require("../controleurs/chat.controleur");
const { proteger } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", proteger, discuter);

module.exports = router;
