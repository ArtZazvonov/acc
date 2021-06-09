const { model, Schema } = require('mongoose')

const options = { toJSON: { virtuals: true }, toObject: { virtuals: true } }
const ticketSchema = new Schema({
  ticketAuthor: {
    type: Object
  },
  client: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  views: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 0
  },
  executor: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  comments: [
    {
      ref: 'Comment',
      type: Schema.Types.ObjectId
    }
  ]
}, options)

module.exports = model('Ticket', ticketSchema)
