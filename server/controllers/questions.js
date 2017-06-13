const Question = require('../models/question')
const Answer = require('../models/answer')

var create = ((req,res) => {
  let newQuestion = new Question ({
    title: req.body.title,
    content: req.body.content,
    creator: req.body.creator
  })
  newQuestion.save((err,createdQuestion) => {
    res.send(err ? err : createdQuestion)
  })
})

var showAll = ((req,res) => {
  Question.find((err, questions) => {
    res.send(err ? err : questions)
  })
})

var populateOne = ((req,res) => {
  Question.findById(req.params.id)
    .populate('answers')
    .exec((err, question) => {
      res.send(err ? err : question)
    })
})

var update = ((req,res) => {
  let creator = req.body.creator
  Question.findById(id, (err, question) => {
    if (creator === question.creator){
      question.title = req.body.title || question.title
      question.content = req.body.content || question.content
      question.save((err, updatedQuestion) => {
        res.send(err ? err : updatedQuestion)
      })
    }
    else {
      res.send({errors: 'You are not authorized'})
    }
  })
})

var destroy = ((req,res) => {
  let creator = req.body.creator
  Question.findByIdAndRemove(req.params.id, (err, question) => {
    if (creator === question.creator){
      question.answers.forEach((answerId) => {
        Answer.findByIdAndRemove(answerId, (err2, answer) => {
          console.log(err ? err2 : question)
        })
      })
      res.send(err ? err : question)
    }
    else {
      res.send({errors: 'You are not authorized'})
    }
  })
})

var voteUp = ((req,res) => {
  let user = req.body.user
  Question.findById(req.params.id, (err, question) => {
    let incUp = question.vote.up.indexOf(user)
    if (incUp > -1) {
      question.vote.up.splice(incUp, 1)
      res.send(err ? err : question)
    }
    else {
      let incDown = question.vote.down.indexOf(user)
      if (incDown > -1) {
        question.vote.down.splice(incDown, 1)
        question.vote.up.push(user)
        res.send(err ? err : question)
      }
      else {
        question.vote.up.push(user)
        res.send(err ? err : question)
      }
    }
  })
})

var voteDown = ((req,res) => {
  let user = req.body.user
  Question.findById(req.params.id, (err, question) => {
    let incDown = question.vote.down.indexOf(user)
    if (incDown > -1) {
      Question.vote.down.splice(incDown, 1)
      res.send(err ? err : question)
    }
    else {
      let incUp = question.vote.up.indexOf(user)
      if (incUp > -1) {
        Question.vote.up.splice(incUp, 1)
        Question.vote.down.push(user)
        res.send(err ? err : question)
      }
      else {
        Question.vote.down.push(user)
        res.send(err ? err : question)
      }
    }
  })
})

var calcVote = ((req,res) => {
  Question.findById(req.params.id, (err, question) => {
    let totUp = Question.vote.up.length
    let totDown = Question.vote.down.length
    res.send(err ? err : {up: totUp, down: totDown})
  })
})

var calcAnswer = ((req,res) => {
  Question.findById(req.params.id, (err, question) => {
    let totAns = Question.answers.length
    res.send(err ? err : {answers: totAns})
  })
})

module.exports = {
  create,
  showAll,
  populateOne,
  update,
  destroy,
  voteUp,
  voteDown
}
