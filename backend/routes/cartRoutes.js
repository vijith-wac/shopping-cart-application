const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { addItemToCart, updateCartItem, removeItemFromCart, clearCart } = require('../controllers/cartController')
const { customerMiddleWare } = require('../middleware/authMiddleware')

router.post('/', customerMiddleWare, addItemToCart)
router.post('/remove', customerMiddleWare, removeItemFromCart)
router.put('/:id', customerMiddleWare, updateCartItem)
router.delete('/:userID',customerMiddleWare, clearCart)



module.exports = router