const uploaderImages = (req, res) => {
  const fichiers = req.files || (req.file ? [req.file] : []);
  const images = fichiers.map((fichier) => `/uploads/${fichier.filename}`);
  res.status(201).json({ images });
};

module.exports = { uploaderImages };
