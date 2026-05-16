const routeIntrouvable = (req, res, next) => {
  const erreur = new Error(`Route introuvable : ${req.originalUrl}`);
  res.status(404);
  next(erreur);
};

const gererErreur = (err, req, res, next) => {
  const statut = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statut).json({
    message: err.message || "Erreur serveur",
    details: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = { routeIntrouvable, gererErreur };
