const { model, Schema } = require('mongoose')

const options = { toJSON: { virtuals: true }, toObject: { virtuals: true } }
const commentSchema = new Schema({
  ticketID: {
    ref: 'Ticket',
    type: Schema.Types.ObjectId
  },
  commentAuthor: {
    type: Object
  },
  commentText: {
    type: String,
    required: true
  },
  commentDate: {
    type: Date,
    default: Date.now
  }
}, options)

module.exports = model('Comment', commentSchema)
