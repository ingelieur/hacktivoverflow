const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
mongoose.connect('mongodb://localhost/hacktiverflow')

const app = express()

var index = require('./routes/index')
var admins = require('./routes/admins')
var users = require('./routes/users')
var questions = require('./routes/questions')
var answers = require('./routes/answers')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)
app.use('/dashboard', admins)
app.use('/api/users', users)
app.use('/api/questions', questions)
app.use('/api/answers', answers)

app.listen(3000)

module.exports = app
