const { Router } = require('express')
// const passport = require('passport')
const authController = require('../controllers/user.controller')
const router = Router()

// /api/user/admin/create
router.post('/admin/create', authController.createUser)

module.exports = router
