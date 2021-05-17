/* eslint-disable node/handle-callback-err */
const Ticket = require('../models/ticket.model')
const Comment = require('../models/comments.model')

// Контроллер для создания тикета
module.exports.createTicket = async (req, res) => {
  try {
    const ticket = new Ticket({
      createUser: req.body.userID,
      client: req.body.client,
      address: req.body.address,
      phone: req.body.phone,
      description: req.body.description
    })
    await ticket.save()
      .then(function (ticket) { res.status(201).json(ticket) })
      .catch(function (err) { console.log(err) })
  } catch (e) {
    res.status(500).json(e)
  }
}
// Контроллер для получения списка тикетов
module.exports.getTicketLList = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('comments').populate('createUser', 'name').sort({ date: -1 })
    res.json(tickets)
  } catch (e) {
    res.status(500).json(e)
  }
}
// Контроллер для получения тикета
module.exports.getTicket = async (req, res) => {
  try {
    await Ticket.find({ _id: req.params.id })
      .populate('comments').populate('createUser', 'name')
      .exec((error, ticket) => {
        res.json(ticket)
      })
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
// Контроллер для добавления комментария
module.exports.createTicketComment = async (req, res) => {
  const comment = new Comment({
    text: req.body.text,
    ticketID: req.body.ticketID,
    createUser: req.body.authorID
  })
  try {
    await comment.save()
    res.status(201).json(comment)
    // .then(function (comment) {
    //   res.status(201).json(comment)
    // })
    // .catch(function (err) { console.log(err) })
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
