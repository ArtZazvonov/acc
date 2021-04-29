const { Router } = require('express')
const { login, createUser } = require('../controllers/auth.controller')
const router = Router()

// /api/auth/login
router.post('/login', login)

// /api/auth/create
router.post('/create', createUser)

module.exports = router
