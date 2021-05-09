const express = require('express');
const userController = require('../src/controllers/user')
const groupController = require('../src/controllers/groups');
const chatController = require('../src/controllers/chats');
const authenticateToken = require('../middleware/auth');
const router = express.Router()


router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/groupList', authenticateToken, groupController.list)
router.get('/getChat/:id', authenticateToken, chatController.list)


module.exports = router