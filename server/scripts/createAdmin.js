import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../models/User.js'

const [email, password, ...nameParts] = process.argv.slice(2)
const name = nameParts.join(' ') || 'EstatePro Administrator'

if (!email || !password || password.length < 8) {
  console.error('Usage: node server/scripts/createAdmin.js admin@example.com StrongPassword "Admin Name"')
  process.exit(1)
}

await mongoose.connect(process.env.MONGODB_URI)
const normalizedEmail = email.trim().toLowerCase()
const existing = await User.findOne({ email: normalizedEmail })
if (existing) {
  existing.role = 'admin'
  existing.status = 'active'
  await existing.save()
  console.log(`Existing user promoted to administrator: ${normalizedEmail}`)
} else {
  await User.create({ name, email: normalizedEmail, passwordHash: await bcrypt.hash(password, 12), role: 'admin', status: 'active' })
  console.log(`Administrator created: ${normalizedEmail}`)
}
await mongoose.disconnect()
