const passport = require('passport')
const { Router } = require('express')
const ctr = require('../controllers/ticket.controller')
const router = Router()

// /api/ticket/
// router.post('/', passport.authenticate('jwt', { session: false }), ctr.createTicket)
router.post('/create', ctr.createTicket)

router.get('/getAllTicket', ctr.getAllTicket)
// /api/ticket/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), ctr.getTicket)

router.put('/:id', passport.authenticate('jwt', { session: false }), ctr.updateTicket)

router.put('/:id', passport.authenticate('jwt', { session: false }), ctr.viewTicket)

router.delete('/:id', passport.authenticate('jwt', { session: false }), ctr.removeTicket)

module.exports = router
