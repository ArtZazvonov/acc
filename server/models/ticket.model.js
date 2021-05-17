const { model, Schema } = require('mongoose')

const ticketSchema = new Schema({
  createUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
    // status 0 - Новый
    // status 1 - В работе
    // status 2 - Нужен выезд
    // status 3 - Ожидает действия клинта
    // status 4 - Выполнен
    // status 5 - Отложен
    // status 6 - Закрыт
    type: Number,
    default: 0
  },
  comments: [
    {
      ref: 'Comment',
      type: Schema.Types.ObjectId
    }
  ]
})

module.exports = model('Ticket', ticketSchema)
