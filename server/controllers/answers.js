const Answer = require('../models/answer')
const Question = require('../models/question')

var create = ((req,res) => {
  let questionId = req.body.question
  let newAnswer = new Answer ({
    title: req.body.title,
    content: req.body.content,
    creator: req.body.creator
  })
  newAnswer.save((err,createdAnswer) => {
    Question.findById(questionId, (err, question) => {
      question.answers.push(newAnswer._id)
    })
    res.send(err ? err : createdUser)
  })
})

var showAll = ((req,res) => {
  Answer.find((err, answers) => {
    res.send(err ? err : answers)
  })
})

var update = ((req,res) => {
  Answer.findById(id, (err, answer) => {
    answer.title = req.body.title || answer.title
    answer.content = req.body.content || answer.content
    answer.save((err, updatedAnswer) => {
      res.send(err ? err : updatedAnswer)
    })
  })
})

var destroy = ((req,res) => {
  Answer.findByIdAndRemove(req.params.id, (err, answer) => {
    res.send(err ? err : answer)
  })
})

var voteUp = ((req,res) => {
  let user = req.body.user
  Answer.findById(req.params.id, (err, answer) => {
    let incUp = answer.votes.up.indexOf(user)
    if (incUp > -1) {
      answer.votes.up.splice(incUp, 1)
      res.send(err ? err : answer)
    }
    else {
      let incDown = answer.votes.down.indexOf(user)
      if (incDown > -1) {
        answer.votes.down.splice(incDown, 1)
        answer.votes.up.push(user)
        res.send(err ? err : answer)
      }
      else {
        answer.votes.up.push(user)
        res.send(err ? err : answer)
      }
    }
  })
})

var voteDown = ((req,res) => {
  let user = req.body.user
  Answer.findById(req.params.id, (err, answer) => {
    let incDown = answer.votes.down.indexOf(user)
    if (incDown > -1) {
      Answer.votes.down.splice(incDown, 1)
      res.send(err ? err : answer)
    }
    else {
      let incUp = answer.votes.up.indexOf(user)
      if (incUp > -1) {
        Answer.votes.up.splice(incUp, 1)
        Answer.votes.down.push(user)
        res.send(err ? err : answer)
      }
      else {
        Answer.votes.down.push(user)
        res.send(err ? err : answer)
      }
    }
  })
})

var calcVote = ((req,res) => {
  Answer.findById(req.params.id, (err, answer) => {
    let totUp = Answer.votes.up.length
    let totDown = Answer.votes.down.length
    res.send(err ? err : {up: totUp, down: totDown})
  })
})

module.exports = {
  create,
  showAll,
  update,
  destroy,
  voteUp,
  voteDown
}
