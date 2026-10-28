import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function createToken(user) {
  return jwt.sign({ sub: user._id.toString(), email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, status: user.status, createdAt: user.createdAt }
}

router.post('/signup', async (request, response, next) => {
  try {
    const { name, email, password, consent } = request.body
    const normalizedEmail = email?.trim().toLowerCase()
    if (!name?.trim() || !email || !emailPattern.test(normalizedEmail) || !password || !consent) {
      return response.status(400).json({ message: 'Name, valid email, password, and consent are required.' })
    }
    if (password.length < 8) return response.status(400).json({ message: 'Password must be at least 8 characters.' })
    if (await User.exists({ email: normalizedEmail })) return response.status(409).json({ message: 'An account with this email already exists.' })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ name: name.trim(), email: normalizedEmail, passwordHash })
    return response.status(201).json({ token: createToken(user), user: publicUser(user) })
  } catch (error) {
    return next(error)
  }
})

router.post('/login', async (request, response, next) => {
  try {
    const normalizedEmail = request.body.email?.trim().toLowerCase()
    const { password } = request.body
    if (!normalizedEmail || !emailPattern.test(normalizedEmail) || !password) {
      return response.status(400).json({ message: 'Valid email and password are required.' })
    }
    const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash')
    if (!user || user.status !== 'active' || !(await bcrypt.compare(password, user.passwordHash))) {
      return response.status(401).json({ message: 'Invalid email or password.' })
    }
    return response.json({ token: createToken(user), user: publicUser(user) })
  } catch (error) {
    return next(error)
  }
})

router.get('/me', requireAuth, async (request, response, next) => {
  try {
    const user = await User.findById(request.user.sub)
    if (!user) return response.status(404).json({ message: 'User not found.' })
    return response.json({ user: publicUser(user) })
  } catch (error) {
    return next(error)
  }
})

export default router
