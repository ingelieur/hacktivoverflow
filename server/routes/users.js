const router = require('express').Router()
const User = require('../controllers/users')
const Util = require('../helpers/util')

router.use('/',Util.userAuthentization)
router.param('id', Util.userAuthentization)

router.get('/', User.showAll)
router.get('/:id', User.showOne)
router.delete('/:id', User.destroy)
router.put('/:id', User.update)

module.exports = router
