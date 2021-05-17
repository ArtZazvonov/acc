const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String
    }
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
  role: {
    type: Number,
    default: 0
  }
})
userSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last
})
userSchema.set('toObject', { virtuals: true })
module.exports = model('User', userSchema)
