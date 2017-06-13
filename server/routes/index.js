const router = require('express').Router()
const User = require('../controllers/users')

router.get('/', (req, res) => {
  res.send('alive')
})

router.post('/signin', User.signin)
router.post('/signup', User.create)

module.exports = router
