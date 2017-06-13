const mongoose = require('mongoose')
const Schema = mongoose.Schema

var questionSchema = new Schema ({
  title: {
    type: String,
    minlength: [5, '{PATH} should not be less than five characters'],
    required: [true, '{PATH} should not be empty']
  },
  content: {
    type: String,
    minlength: [15, '{PATH} should not be less than 15 characters'],
    required: [true, '{PATH} should not be empty']
  },
  votes: [
    {
      up: {
        type: Schema.Types.ObjectId, ref: 'User'
      },
      down: {
        type: Schema.Types.ObjectId, ref: 'User'
      }
    }
  ],
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  creator: {type: Schema.Types.ObjectId, ref: 'User'}
})

var Question = mongoose.model('question', questionSchema)

module.exports = Question
