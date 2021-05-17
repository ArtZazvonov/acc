const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const routes = require('./routes/index.routes')
const keys = require('./keys')
const app = express()

mongoose.set('useFindAndModify', false)
mongoose.connect(keys.MONGO_URI, { useFindAndModify: false })
  .then(() => console.log('mongoDB connected...'))
  .catch(error => console.log('mongoDB connected ERROR: ' + error))
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(passport.initialize())
passport.use(passportStrategy)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', routes)

module.exports = app
