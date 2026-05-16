const autoriserRoles = (...roles) => (req, res, next) => {
  if (!req.utilisateur || !roles.includes(req.utilisateur.role)) {
    res.status(403);
    return next(new Error("Acces interdit pour ce role"));
  }

  next();
};

module.exports = { autoriserRoles };
