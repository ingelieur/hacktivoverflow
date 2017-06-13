const router = require('express').Router()
const Answer = require('../controllers/answers')
const Util = require('../helpers/util')

router.get('/', Answer.showAll)
router.post('/', Answer.create)
router.put('/:id', Answer.update)
router.delete('/:id', Answer.destroy)
router.post('/voteup/:id', Answer.voteUp)
router.post('/votedown/:id', Answer.voteDown)

module.exports = router
