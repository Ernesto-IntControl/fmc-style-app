const path = require("path");
const multer = require("multer");

const stockage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const nom = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    cb(null, nom);
  },
});

const filtrerImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Seules les images sont autorisees"));
};

const upload = multer({
  storage: stockage,
  fileFilter: filtrerImage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
