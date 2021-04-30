const { Router } = require('express')
// const passport = require('passport')
const authController = require('../controllers/auth.controller')
const router = Router()

// /api/auth/login
router.post('/login', authController.login)

module.exports = router
