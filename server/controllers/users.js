const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10
const dotenvconfig = require('dotenv').config()

var create = ((req,res) => {
  if(req.body.password.length > 0) {
    if(req.body.password.length > 8) {
      let newUser = new User ({
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        email: req.body.email,
        role: 'user',
        loginMethod: 'native'
      })
      newUser.save((err,createdUser) => {
        res.send(err ? err : createdUser)
      })
    }
    else {
      res.send({errors: {password: {message: `Password should not be less than 8 characters`}}})
    }
  }
  else {
    res.send({errors: {password: {message: `Password should not be empty`}}})
  }
})

var FBsignin = ((req,res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if(err) res.send(err)
    if(user) {
      res.send(user)
    }
    else {
      bcrypt.hash(req.body.password, saltRounds, (err,hash) => {
        let newUser = new User ({
          name: req.body.name,
          username: req.body.username,
          password: 'facebook',
          email: req.body.email,
          role: 'user',
          loginMethod: 'facebook'
        })
        newUser.save((err,createdUser) => {
          res.send(err ? err : createdUser)
        })
      })
    }
  })
})

var signin = ((req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if(err) res.send(err)
    else {
      if(user) {
        bcrypt.compare(req.body.password, user.password, (err,result) => {
          if(err) res.send(err)
          else {
            if(result) {
              let token = jwt.sign({id: user.id, name: user.name, username: user.username, role: user.role}, process.env.SECRET_KEY)
              res.send({token:token})
            }
            else {
              res.send({err: 'Username/password is wrong'})
            }
          }
        })
      }
      else {
        res.send({err: 'Username/password is wrong'})
      }
    }
  })
})

var showAll = ((req,res) => {
  User.find({role:'user'}, 'username name', (err,users) => {
    res.send(err ? err : users)
  })
})

var showOne = ((req,res) => {
  User.findById(req.params.id, (err,user) => {
    res.send(err ? err : user)
  })
})

var update = ((req,res) => {
  User.findById(req.params.id, (err,user) => {
    if(err) res.send(err)
    else {
      user.name = req.body.name || user.name
      user.password = bcrypt.hashSync(req.body.password, saltRounds) || user.password
      user.save((errSaving, savedUser) => {
        res.send(errSaving ? errSaving : savedUser)
      })
    }
  })
})

var destroy = ((req,res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    res.send(err ? err : user)
  })
})

module.exports = {
  create,
  FBsignin,
  signin,
  showAll,
  showOne,
  update,
  destroy
}
