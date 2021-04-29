const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  role: {
    type: Number,
    default: 0
  }
})

module.exports = model('users', userSchema)
