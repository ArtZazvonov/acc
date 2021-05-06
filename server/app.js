const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const ticketRoutes = require('./routes/ticket.routes')
const keys = require('./keys')
const app = express()

mongoose.set('useFindAndModify', false)
mongoose.connect(keys.MONGO_URI, { useFindAndModify: false })
  .then(() => console.log('mongoDB connected...'))
  .catch(error => console.log('mongoDB connected ERROR: ' + error))

app.use(passport.initialize())
passport.use(passportStrategy)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/ticket', ticketRoutes)

module.exports = app
