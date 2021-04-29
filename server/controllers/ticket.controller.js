const Ticket = require('../models/ticket.model')
module.exports.createTicket = async (req, res) => {
  const ticket = new Ticket({
    client: req.body.client,
    adress: req.body.adress,
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

module.exports.getAllTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ date: -1 })
    res.json(tickets)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getTicket = async (req, res) => {
  try {
    // /:id
    await Ticket.findById(req.params.id).populate('comments').exec((_error, ticket) => {
      res.json(ticket)
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

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

module.exports.viewTicket = async (req, res) => {
  const $set = {
    views: true
  }
  try {
    await Ticket.findOneAndUpdate({ _id: req.params.id }, { $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.removeTicket = async (req, res) => {
  try {
    await Ticket.deleteOne({ _id: req.params.id })
    res.json({ message: 'Тикет удален' })
  } catch (e) {
    res.status(500).json(e)
  }
}
