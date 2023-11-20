const express = require("express")
const cors = require("cors")
const errorHandler = require("./utils/errorHandler")

// Importation des routes
const apiRoutes = require("./routes/apiRoutes")
// const profileRoutes = require("./routes/profileRoutes")

// Initialisation d'Express
const app = express()


// Middleware pour parser les requêtes JSON
app.use(express.json())

// Middleware CORS pour gérer les requêtes cross-origin
app.use(cors())

// Utilisation des routes
app.use("/api", apiRoutes)
// app.use("/profile", profileRoutes)

// Gestion des erreurs
app.use(errorHandler)

// Démarrage du serveur
const PORT = 4000
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`))
