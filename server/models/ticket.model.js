const { model, Schema } = require('mongoose')

const ticketSchema = new Schema({
  client: {
    type: String,
    unique: true,
    required: true
  },
  adress: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    minLength: 6
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
      type: Schema.Types.ObjectId,
      ref: 'comments'
    }
  ]
})

module.exports = model('ticket', ticketSchema)
