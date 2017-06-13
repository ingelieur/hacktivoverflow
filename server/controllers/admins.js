const user = require('../models/user')
const jwt = require('jsonwebtoken')
const dotenvconfig = require('dotenv').config()
const bcrypt = require('bcrypt')
const saltRounds = 10

var create = ((req,res) => {
  bcrypt.hash(req.body.password, saltRounds, (err,hash) => {
    let newUser = new user ({
      name: req.body.name,
      username: req.body.username,
      password: hash,
      email: req.body.email,
      role: req.body.role || 'user',
      loginMethod: 'native'
    })
    newUser.save((err,createdUser) => {
      res.send(err ? err : createdUser)
    })
  })
})

var getAllUsers = ((req,res) => {
  user.find({role:'user'}, (err,users) => {
    res.send(err ? err : users)
  })
})

var getAllAdmins = ((req,res) => {
  user.find({role:'admin'}, (err,admins) => {
    res.send(err ? err : admins)
  })
})

var update = ((req,res) => {
  user.findById(req.params.id, (err,user) => {
    if(err) res.send(err)
    else {
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.password = bcrypt.hashSync(req.body.password, saltRounds) || user.password
      user.name = req.body.name || user.name
      user.role = req.body.role || user.role
      user.save((errSaving, savedUser) => {
        res.send(err ? err : savedUser)
      })
    }
  })
})

module.exports = {
  create,
  getAllUsers,
  getAllAdmins,
  update
}
