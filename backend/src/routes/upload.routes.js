const express = require("express");
const upload = require("../middlewares/upload.middleware");
const { uploaderImages } = require("../controleurs/upload.controleur");
const { proteger } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", proteger, upload.array("images", 5), uploaderImages);

module.exports = router;
