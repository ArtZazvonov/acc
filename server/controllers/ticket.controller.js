/* eslint-disable node/handle-callback-err */
const Ticket = require('../models/ticket.model')
// const Comment = require('../models/commentsTicket.model.js')
// Контроллер создания тикета
module.exports.createTicket = async (req, res) => {
  const ticket = new Ticket({
    client: req.body.client,
    address: req.body.address,
    phone: req.body.phone,
    description: req.body.description
  })
  try {
    await ticket.save()
    res.status(201).json(ticket)
  } catch (e) {
    res.status(500).json(e)
  }
}
// Контроллер для получения списка тикетов
module.exports.getTicketLList = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ date: -1 })
    res.json(tickets)
  } catch (e) {
    res.status(500).json(e)
  }
}
// Контроллер для получения тикета
module.exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    res.json(ticket)
  } catch (e) {
    res.status(500).json(e)
  }
}
// Контроллер для обновления тикета
module.exports.updateTicket = async (req, res) => {
  const $set = {
    status: req.body.status,
    description: req.body.description
  }
  try {
    const ticket = await Ticket.findOneAndUpdate({
      _id: req.params.id
    }, { $set }, { new: true })
    res.json(ticket)
  } catch (e) {
    res.status(500).json(e)
  }
}
// Контроллер для удаления тикета
module.exports.removeTicket = async (req, res) => {
  try {
    await Ticket.deleteOne({ _id: req.params.id })
    res.json({ message: 'Тикет удален' })
  } catch (e) {
    res.status(500).json(e)
  }
}
// Контроллер для добавления "кто смотрел" тикет
// module.exports.viewTicket = async (req, res) => {
//   const $set = {
//     views: true
//   }
//   try {
//     await Ticket.findOneAndUpdate({ _id: req.params.id }, { $set })
//     res.status(204).json()
//   } catch (e) {
//     res.status(500).json(e)
//   }
// }
// Контроллер для добавления комметария к тикету
// module.exports.addComment = async (req, res) => {
//   try {
//     const comment = new Comment({
//       name: req.body.name,
//       text: req.body.text,
//       ticketId: req.body.ticketId
//     })
//     await comment.save()

//     const ticket = await Ticket.findById(comment.ticketId)
//     ticket.comments.push(comment._id)
//     await ticket.save()

//     res.status(201).json(comment)
//   } catch (e) {
//     res.status(500).json(e)
//   }
// }
