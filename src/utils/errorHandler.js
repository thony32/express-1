const errorHandler = (err, req, res, next) => {
  // Code d'état de la réponse par défaut est 500 (erreur serveur)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  res.status(statusCode)

  res.json({
    message: err.message,
    // Stack trace seulement en mode de développement
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  })
}

module.exports = errorHandler
