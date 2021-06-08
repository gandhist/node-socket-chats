const express = require('express');
const userController = require('../src/controllers/user')
const contactController = require('../src/controllers/contacts')
const groupController = require('../src/controllers/groups');
const chatController = require('../src/controllers/chats');
const uploadController = require('../src/controllers/uploads');
const authenticateToken = require('../middleware/auth');
const router = express.Router()


router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/groupList', authenticateToken, groupController.list)
router.get('/getChat/:tipe/:id', authenticateToken, chatController.list)
router.get('/lazyChat/:tipe/:id', authenticateToken, chatController.lazy_list)
router.post('/getMeta', authenticateToken, chatController.getMeta)
router.get('/contacts', authenticateToken, contactController.getAll)

router.post('/uploads/image',authenticateToken, uploadController.image)

router.get('/tokenFirebase', authenticateToken, userController.getToken)
router.post('/tokenFirebase', authenticateToken, userController.setToken)


module.exports = router