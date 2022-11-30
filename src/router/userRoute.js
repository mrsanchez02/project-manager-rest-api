const express  = require('express')
const auth = require('../middlewares/Auth')
const { userRegister, userLogin, userInfo, userDelete, userLogout } = require('../controllers/userController')

const router = new express.Router()

router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/logout', auth,  userLogout)
router.get('/me', auth, userInfo)
router.delete('/me', auth, userDelete)

module.exports = router