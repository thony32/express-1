const nodemailer = require("nodemailer")

const sendEmail = async (options) => {
  // Création d'un transporter pour nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // Définition des options d'email
  const mailOptions = {
    from: "Votre Nom <email@example.com>",
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html, // Vous pouvez utiliser "text" ou "html"
  }

  // Envoi de l'email
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
