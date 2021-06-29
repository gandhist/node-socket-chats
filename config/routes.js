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
router.post('/lazyChat/:tipe/:id', authenticateToken, chatController.lazy_list)
router.post('/getMeta', authenticateToken, chatController.getMeta)
router.get('/contacts', authenticateToken, contactController.getAll)

router.put('/profile', authenticateToken, userController.update)
router.put('/changePassword', authenticateToken, userController.changePassword)
router.put('/profile/picture', authenticateToken, userController.changePhoto)
router.get('/profile/:id?', authenticateToken, userController.getProfileById)

router.post('/uploads/image',authenticateToken, uploadController.image)
router.post('/uploads/document',authenticateToken, uploadController.document)

router.get('/tokenFirebase', authenticateToken, userController.getToken)
router.post('/tokenFirebase', authenticateToken, userController.setToken)


module.exports = router