/* eslint-disable node/handle-callback-err */
const Ticket = require('../models/ticket.model')
const User = require('../models/user.model')
const Comment = require('../models/comments.model')

// Контроллер для создания тикета
module.exports.createTicket = async (req, res) => {
  try {
    const ticket = new Ticket({
      ticketAuthor: req.body.ticketAuthor,
      client: req.body.client,
      address: req.body.address,
      phone: req.body.phone,
      description: req.body.description,
      executor: req.body.executor ? req.body.executor : null
    })
    await ticket.save().then(function (ticket) { res.status(201).json(ticket) })
    if (req.body.executor) {
      const user = await User.findById(req.body.executor)
      user.tickets.push(ticket)
      await user.save()
    }
  } catch (e) {
    res.status(500).json(e)
  }
}
// Контроллер для получения списка тикетов
module.exports.getTicketLList = async (req, res) => {
  try {
    const tickets = await Ticket.find({}).populate('comments').sort({ date: -1 })
    for (let i = 0; i < tickets.length; i++) {
      const ticket = tickets[i]
      ticket.comments = await Comment.find({ ticketID: ticket._id })
    }
    res.json(tickets)
  } catch (e) {
    res.status(500).json(e)
  }
}
// Контроллер для получения тикета
module.exports.getTicket = async (req, res) => {
  try {
    await Ticket.find({ _id: req.params.id })
      .populate('comments').exec((error, ticket) => {
        res.json(ticket)
      })
  } catch (e) {
    res.status(500).json(e)
  }
}
// Контроллер для обновления тикета
module.exports.updateTicket = async (req, res) => {
  const $set = req.body
  try {
    const ticket = await Ticket.findOneAndUpdate({
      _id: req.params.id
    }, { $set }, { new: true })
    res.json(ticket)
  } catch (e) {
    res.status(500).json(e)
  }
}
module.exports.changeTicketExecutor = async (req, res) => {
  try {
    const oldExecutor = await Ticket.findById(req.body._id, 'executor')
    const newExecutor = await User.findById(req.body.executor).select('id')
    await User.findOneAndUpdate({ _id: oldExecutor.executor }, { $pull: { tickets: req.body._id } })
    await User.findOneAndUpdate({ _id: newExecutor._id }, { $push: { tickets: req.body._id } })
    await Ticket.findOneAndUpdate({ _id: req.params.id }, { $set: { executor: req.body.executor } })
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
// Контроллер для добавления комментария
module.exports.createTicketComment = async (req, res) => {
  const comment = new Comment({
    ticketID: req.body.ticketID,
    commentAuthor: req.body.commentAuthor,
    commentText: req.body.commentText
  })
  try {
    await comment.save()
    res.status(201).json(comment)
    const ticket = await Ticket.findById(req.body.ticketID)
    ticket.comments.push(comment)
    await ticket.save()
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
