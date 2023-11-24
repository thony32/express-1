const Users = require("../models/userModel")

exports.createUser = function (req, res) {
  let newUser = new Users(req.body)
  Users.createUser(newUser, function (err, user) {
    if (err) res.send(err)
    res.json(user)
  })
}

exports.updateUser = function (req, res) {
  let userId = req.params.id
  let user = req.body
  Users.updateUser(userId, user, function (err, user) {
    if (err) res.send(err)
    res.json(user)
  })
}

exports.deleteUser = function (req, res) {
  Users.deleteUser(req.params.id, function (err, user) {
    if (err) res.send(err)
    res.json({ message: "User successfully deleted" })
  })
}

exports.getUser = function (req, res) {
  Users.getUser(req.params.id, function (err, user) {
    if (err) res.send(err)
    res.json(user)
  })
}

exports.getAllUsers = function (req, res) {
  Users.getAllUsers(function (err, users) {
    if (err) res.send(err)
    console.log("res", users)
    res.send(users)
  })
}

exports.login = function (req, res) {
  const { email, password } = req.body
  Users.login(email, password, function (err, user) {
    if (err) res.send(err)
    res.json(user)
  })
}

exports.register = function (req, res) {
  let newUser = new Users(req.body)
  Users.register(newUser, function (err, user) {
    if (err) res.send(err)
    res.json(user)
  })
}
