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
router.get('/authorizedUser/:id', passport.authenticate('jwt', { session: false }), authController.authorizedUser) // роут для получения авторизованного пользователя

/* ----- ADMIN ROUTES ----- */
// Пользователи
router.post('/admin/user/create', passport.authenticate('jwt', { session: false }), upload.single('image'), userController.createUser) // Роут для создания пользователя
router.get('/admin/user/list', passport.authenticate('jwt', { session: false }), userController.listUser) // Роут для получения списка пользователей
router.get('/admin/user/:id', passport.authenticate('jwt', { session: false }), userController.getUser) // Роут для получения конкретного пользователя
router.put('/admin/user/:id', passport.authenticate('jwt', { session: false }), userController.updateUser) // Роут для измененя пользователя
router.delete('/admin/user/:id', passport.authenticate('jwt', { session: false }), userController.removeUser) // Роут для удаления пользователя

/* ----- OTHER ROUTES ----- */
// Тикеты
router.post('/ticket/create', passport.authenticate('jwt', { session: false }), ticketController.createTicket) // Роут для создания тикета
router.get('/ticket/List', passport.authenticate('jwt', { session: false }), ticketController.getTicketLList) // Роут для получения списка тикетов
router.get('/ticket/:id', passport.authenticate('jwt', { session: false }), ticketController.getTicket) // Роут для получения тикета
router.put('/ticket/:id', passport.authenticate('jwt', { session: false }), ticketController.updateTicket) // Роут для обновления тикета
router.put('/ticket/changeTicketExecutor/:id', passport.authenticate('jwt', { session: false }), ticketController.changeTicketExecutor) // Роут для обновления тикета
router.delete('/ticket/:id', passport.authenticate('jwt', { session: false }), ticketController.removeTicket) // Роут для удаления тикета
router.post('/ticket/comment/create', passport.authenticate('jwt', { session: false }), ticketController.createTicketComment) // Роут для добавления комментария
// Пользователи
router.get('/user/executorList', passport.authenticate('jwt', { session: false }), userController.executorList) // Роут для получения списка исполнителей

module.exports = router
