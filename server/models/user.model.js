const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
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
  phone: {
    type: Number
  },
  image: {
    type: String
  },
  role: {
    type: Number,
    default: 0
  }
})
module.exports = model('User', userSchema)
