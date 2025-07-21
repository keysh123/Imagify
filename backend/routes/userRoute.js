const express = require('express')
const {registerUser , loginUser , userCredits , paymentRazorpay, verifyPayment} = require('../controllers/userController')
const {userAuth} = require('../middlewares/auth')
const router = express.Router()

router.post('/login',loginUser)
router.post('/register',registerUser)
router.get('/get-credits',userAuth,userCredits)
router.post('/buy-credits', userAuth, paymentRazorpay)
router.post('/verify-payment', userAuth, verifyPayment)

module .exports = router