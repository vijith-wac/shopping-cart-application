const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { getAllUsers } = require('../controllers/userControler')
const { getOrdersByUser } = require('../controllers/orderController')
const { getCartByUser } = require('../controllers/cartController')
const { adminMiddleWare, customerMiddleWare } = require('../middleware/authMiddleware')


router.get('/', adminMiddleWare, getAllUsers)
router.get('/:userID/orders', customerMiddleWare,  getOrdersByUser)
router.get('/:userID/cart', customerMiddleWare, getCartByUser)



module.exports = router