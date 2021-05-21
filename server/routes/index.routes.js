const { Router } = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const ticketController = require('../controllers/ticketController')
const router = Router()
/* /api - главный роут */
// Авторизация
router.post('/login', authController.login) // роут авторизации на клиенте
router.get('/userAuth/:id', authController.userAuth) // роут авторизации на клиенте
/* ----- ADMIN ROUTES ----- */
// Пользователи
router.post('/admin/user/create', passport.authenticate('jwt', { session: false }), upload.single('image'), userController.createUser) // Роут для создания пользователя
router.get('/admin/user/list', userController.listUser) // Роут для получения списка пользователей
router.get('/admin/user/:id', userController.getUser) // Роут для получения конкретного пользователя
router.put('/admin/user/:id', userController.updateUser) // Роут для измененя пользователя
router.delete('/admin/user/:id', userController.removeUser) // Роут для удаления пользователя

/* ----- OTHER ROUTES ----- */
// Тикеты
router.post('/ticket/create', passport.authenticate('jwt', { session: false }), ticketController.createTicket) // Роут для создания тикета
router.get('/ticket/List', passport.authenticate('jwt', { session: false }), ticketController.getTicketLList) // Роут для получения списка тикетов
router.get('/ticket/:id', passport.authenticate('jwt', { session: false }), ticketController.getTicket) // Роут для получения тикета
router.put('/ticket/:id', passport.authenticate('jwt', { session: false }), ticketController.updateTicket) // Роут для обновления тикета
router.delete('/ticket/:id', passport.authenticate('jwt', { session: false }), ticketController.removeTicket) // Роут для удаления тикета
router.post('/ticket/comment/create', ticketController.createTicketComment) // Роут для добавления комментария

module.exports = router
