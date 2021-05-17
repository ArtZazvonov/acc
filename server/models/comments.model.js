const { model, Schema } = require('mongoose')

const commentSchema = new Schema({
  createUser: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  ticketID: {
    ref: 'Ticket',
    type: Schema.Types.ObjectId
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Comment', commentSchema)
