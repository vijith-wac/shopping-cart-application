const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { addItemToCart, updateCartItem, removeItemFromCart, clearCart } = require('../controllers/cartController')

router.post('/',addItemToCart)
router.post('/remove', removeItemFromCart)
router.put('/:id', updateCartItem)
router.delete('/:userID',clearCart)



module.exports = router