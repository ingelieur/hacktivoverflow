const router = require('express').Router()
const Question = require('../controllers/questions')
const Util = require('../helpers/util')

router.get('/', Question.showAll)
router.post('/', Util.authentication, Question.create)
router.get('/:id', Question.populateOne)
router.put('/:id', Question.update)
router.delete('/:id', Question.destroy)
router.post('/voteup/:id', Util.authentication, Question.voteUp)
router.post('/votedown/:id', Util.authentication, Question.voteDown)

module.exports = router
