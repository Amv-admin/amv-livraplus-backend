
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { db } from './lib/db.js'
import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import ordersRouter from './routes/orders.js'
import paymentsRouter from './routes/payments.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>res.json({ok:true, name:'Amv LivraPlus API'}))

app.use('/auth', authRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)
app.use('/payments', paymentsRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log(`API running on http://localhost:${PORT}`))
