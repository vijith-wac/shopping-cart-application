const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')
const usersRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')

dotenv.config()
const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
// Set the uploads folder as a static directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json())

connectDB()


app.use('/api/product', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/user',usersRoutes)
app.use('/api/cart',cartRoutes)



app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})