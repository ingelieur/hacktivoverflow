const jwt = require('jsonwebtoken')

var userAuthentization = ((req,res,next,id) => {
  var token = req.headers.token
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded) {
        if(req.path !== '/') {
          if(decoded.id === req.params.id) {
            next()
          }
          else {
            res.send({errors: 'You are not authorized'})
          }
        }
        else {
          next()
        }
      }
      else {
        res.send({errors: 'You are not authorized'})
      }
    })
  }
  else {
    res.send({errors: 'You are not authorized'})
  }
})

var adminAuthentization = ((req,res,next) => {
  var token = req.headers.token
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded.role === 'admin') {
        next()
      }
      else {
        res.send({errors: 'You are not authorized'})
      }
    })
  }
  else {
    res.send({errors: 'You are not authorized'})
  }
})

var authentication = ((req,res,next) => {
  let token = req.headers.token
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded) {
        next()
      }
      else {
        res.send({errors: 'You are not authenticated'})
      }
    })
  }
  else {
    res.send({errors: 'You are not authenticated'})
  }
})

module.exports = {
  userAuthentization,
  adminAuthentization,
  authentication
}
