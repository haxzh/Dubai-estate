import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDatabase from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import errorHandler from './middleware/errorHandler.js'
import adminRoutes from './routes/adminRoutes.js'
import publicRoutes from './routes/publicRoutes.js'

const app = express()
const port = Number(process.env.PORT || 5000)
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  throw new Error('MONGODB_URI and JWT_SECRET must be configured in server/.env')
}

app.use(cors({ origin: allowedOrigin }))
app.use(express.json({ limit: '10kb' }))
app.get('/api/health', (_request, response) => response.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/public', publicRoutes)
app.use(errorHandler)

connectDatabase()
  .then(() => app.listen(port, () => console.log(`API running on http://localhost:${port}`)))
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
