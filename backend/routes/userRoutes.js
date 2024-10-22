const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { getAllUsers } = require('../controllers/userControler')
const { getOrdersByUser } = require('../controllers/orderController')
const { getCartByUser } = require('../controllers/cartController')


router.get('/', getAllUsers)
router.get('/:userID/orders', getOrdersByUser)
router.get('/:userID/cart', getCartByUser)
// router.put('/:id', updateProductById)
// router.delete('/:id', deleteProductById)



module.exports = router