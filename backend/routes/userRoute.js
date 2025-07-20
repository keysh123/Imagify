const express = require('express')
const {registerUser , loginUser , userCredits} = require('../controllers/userController')
const {userAuth} = require('../middlewares/auth')
const router = express.Router()

router.post('/login',loginUser)
router.post('/register',registerUser)
router.get('/get-credits',userAuth,userCredits)

module .exports = router