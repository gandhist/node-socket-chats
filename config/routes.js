const express = require('express');
const userController = require('../src/controllers/user')
const contactController = require('../src/controllers/contacts')
const groupController = require('../src/controllers/groups');
const chatController = require('../src/controllers/chats');
const authenticateToken = require('../middleware/auth');
const router = express.Router()


router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/groupList', authenticateToken, groupController.list)
router.get('/getChat/:id', authenticateToken, chatController.list)
router.post('/getMeta', authenticateToken, chatController.getMeta)
router.get('/contacts', authenticateToken, contactController.getAll)


module.exports = router