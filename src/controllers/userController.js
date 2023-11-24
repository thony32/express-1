const Users = require("../models/userModel")


// NOTE: register a user 
exports.createUser = function (req, res) {
  let newUser = new Users(req.body)
  Users.createUser(newUser, function (err, user) {
    if (err) res.send(err)
    res.json(user)
  })
}

// NOTE: Get a single user by username
exports.getUser = function (req, res) {
  Users.getUser(req.params.username, function (err, user) {
    if (err) res.send(err)
    res.json(user)
  })
}

// NOTE: Get all users
exports.getAllUsers = function (req, res) {
  Users.getAllUsers(function (err, users) {
    if (err) res.send(err)
    console.log("res", users)
    res.send(users)
  })
}

// NOTE: Login a user
exports.login = function (req, res) {
  const { email, password } = req.body
  Users.login(email, password, function (err, user) {
    if (err) res.send(err)
    res.json(user)
  })
}
