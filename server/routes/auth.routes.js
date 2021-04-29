const { Router } = require('express')
// const passport = require('passport')
const authController = require('../controllers/auth.controller')
const router = Router()

// /api/auth/login
router.post('/login', authController.login)
// /api/auth/admin/login
router.post('/admin/login', authController.adminLogin)

module.exports = router
