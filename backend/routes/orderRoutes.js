const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { createOrder, getOrderById, getAllOrders, getOrdersByUser, updateOrder, deleteOrder } = require('../controllers/orderController')

router.post('/',createOrder)
router.get('/', getAllOrders)
router.get('/:id', getOrderById)
router.put('/:id', updateOrder)
router.get('/:userID', getOrdersByUser)
router.delete('/:id', deleteOrder)



module.exports = router