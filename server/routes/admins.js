const router = require('express').Router()
const Admin = require('../controllers/admins')
const User = require('../controllers/users')
const Util = require('../helpers/util')

router.use(Util.adminAuthentization)

router.post('/', Admin.create)
router.get('/admins', Admin.getAllAdmins)
router.get('/users', Admin.getAllUsers)
router.get('/:id', User.showOne)
router.delete('/:id', User.destroy)
router.put('/:id', Admin.update)

module.exports = router
