const express = require("express")
const cors = require("cors")
const databaseConnection = require("./utils/databaseConnection")
const errorHandler = require("./utils/errorHandler")

// Importation des routes
const apiRoutes = require("./routes/apiRoutes")
const authenticationRoutes = require("./routes/authenticationRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")
const profileRoutes = require("./routes/profileRoutes")

// Initialisation d'Express
const app = express()

// Connexion à la base de données
databaseConnection()

// Middleware pour parser les requêtes JSON
app.use(express.json())

// Middleware CORS pour gérer les requêtes cross-origin
app.use(cors())

// Utilisation des routes
app.use("/api", apiRoutes)
app.use("/auth", authenticationRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/profile", profileRoutes)

// Gestion des erreurs
app.use(errorHandler)

// Démarrage du serveur
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`))
