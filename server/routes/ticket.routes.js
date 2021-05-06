const passport = require('passport')
const { Router } = require('express')
const ctr = require('../controllers/ticket.controller')
const router = Router()

// Роут API: /api/ticket
router.post('/create', passport.authenticate('jwt', { session: false }), ctr.createTicket) // Роут для создания тикета

router.get('/ticketList', passport.authenticate('jwt', { session: false }), ctr.getTicketLList) // Роут для получения списка тикетов

router.get('/:id', passport.authenticate('jwt', { session: false }), ctr.getTicket) // Роут для получения тикета

router.put('/:id', passport.authenticate('jwt', { session: false }), ctr.updateTicket) // Роут для обновления тикета

router.delete('/:id', passport.authenticate('jwt', { session: false }), ctr.removeTicket) // Роут для удаления тикета

// router.put('/:id', passport.authenticate('jwt', { session: false }), ctr.viewTicket)

module.exports = router
