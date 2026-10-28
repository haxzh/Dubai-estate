import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Course from '../models/Course.js'
import Property from '../models/Property.js'
import Theme from '../models/Theme.js'
import { requireAuth } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/authorize.js'

const router = Router()
router.use(requireAuth, requireAdmin)

const safeUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role, status: user.status, createdAt: user.createdAt })
const pageParams = (request) => ({ page: Math.max(Number(request.query.page) || 1, 1), limit: Math.min(Math.max(Number(request.query.limit) || 10, 1), 100) })

router.get('/stats', async (_request, response, next) => {
  try {
    const [users, activeUsers, courses, properties, publishedProperties, recentUsers, recentCourses, recentProperties] = await Promise.all([
      User.countDocuments(), User.countDocuments({ status: 'active' }), Course.countDocuments(), Property.countDocuments(), Property.countDocuments({ status: 'published' }),
      User.find().sort({ createdAt: -1 }).limit(5).select('name email role status createdAt'),
      Course.find().sort({ createdAt: -1 }).limit(5).select('title status createdAt'),
      Property.find().sort({ createdAt: -1 }).limit(5).select('title location status createdAt'),
    ])
    return response.json({ stats: { users, activeUsers, courses, properties, publishedProperties }, recent: { users: recentUsers.map(safeUser), courses: recentCourses, properties: recentProperties } })
  } catch (error) { return next(error) }
})

router.get('/users', async (request, response, next) => {
  try {
    const { page, limit } = pageParams(request)
    const query = {}; const search = request.query.search?.trim()
    if (search) query.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }]
    if (request.query.role) query.role = request.query.role
    if (request.query.status) query.status = request.query.status
    const [items, total] = await Promise.all([User.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit), User.countDocuments(query)])
    return response.json({ items: items.map(safeUser), page, limit, total, pages: Math.ceil(total / limit) })
  } catch (error) { return next(error) }
})

router.post('/users', async (request, response, next) => {
  try {
    const { name, email, password, role = 'user', status = 'active' } = request.body
    if (!name?.trim() || !email?.trim() || !password || !['admin', 'broker', 'user'].includes(role)) return response.status(400).json({ message: 'Name, email, password, and valid role are required.' })
    const normalizedEmail = email.trim().toLowerCase()
    if (await User.exists({ email: normalizedEmail })) return response.status(409).json({ message: 'An account with this email already exists.' })
    const user = await User.create({ name: name.trim(), email: normalizedEmail, passwordHash: await bcrypt.hash(password, 12), role, status })
    return response.status(201).json({ user: safeUser(user) })
  } catch (error) { return next(error) }
})

router.patch('/users/:id', async (request, response, next) => {
  try {
    const updates = {}; ['name', 'email', 'role', 'status'].forEach((key) => { if (request.body[key] !== undefined) updates[key] = request.body[key] })
    if (updates.role && !['admin', 'broker', 'user'].includes(updates.role)) return response.status(400).json({ message: 'Invalid role.' })
    if (updates.status && !['active', 'inactive'].includes(updates.status)) return response.status(400).json({ message: 'Invalid status.' })
    if (request.params.id === request.user.sub && updates.status === 'inactive') return response.status(400).json({ message: 'You cannot deactivate your own account.' })
    const user = await User.findByIdAndUpdate(request.params.id, updates, { new: true, runValidators: true })
    if (!user) return response.status(404).json({ message: 'User not found.' })
    return response.json({ user: safeUser(user) })
  } catch (error) { return next(error) }
})

router.delete('/users/:id', async (request, response, next) => {
  try {
    if (request.params.id === request.user.sub) return response.status(400).json({ message: 'You cannot delete your own account.' })
    const target = await User.findById(request.params.id)
    if (!target) return response.status(404).json({ message: 'User not found.' })
    if (target.role === 'admin' && await User.countDocuments({ role: 'admin', status: 'active' }) <= 1) return response.status(400).json({ message: 'The last active administrator cannot be deleted.' })
    await target.deleteOne(); return response.json({ message: 'User deleted.' })
  } catch (error) { return next(error) }
})

async function crudList(Model, request, response, next) {
  try {
    const { page, limit } = pageParams(request); const query = {}; const search = request.query.search?.trim()
    if (search) query.$or = [{ title: new RegExp(search, 'i') }, { location: new RegExp(search, 'i') }]
    if (request.query.status) query.status = request.query.status
    const [items, total] = await Promise.all([Model.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit), Model.countDocuments(query)])
    return response.json({ items, page, limit, total, pages: Math.ceil(total / limit) })
  } catch (error) { return next(error) }
}
router.get('/courses', (request, response, next) => crudList(Course, request, response, next))
router.post('/courses', async (request, response, next) => { try { return response.status(201).json({ course: await Course.create({ ...request.body, status: request.body.status || 'published' }) }) } catch (error) { return next(error) } })
router.patch('/courses/:id', async (request, response, next) => { try { const course = await Course.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }); if (!course) return response.status(404).json({ message: 'Course not found.' }); return response.json({ course }) } catch (error) { return next(error) } })
router.delete('/courses/:id', async (request, response, next) => { try { await Course.findByIdAndDelete(request.params.id); return response.json({ message: 'Course deleted.' }) } catch (error) { return next(error) } })
router.get('/properties', (request, response, next) => crudList(Property, request, response, next))
router.post('/properties', async (request, response, next) => { try { return response.status(201).json({ property: await Property.create({ ...request.body, status: request.body.status || 'published' }) }) } catch (error) { return next(error) } })
router.patch('/properties/:id', async (request, response, next) => { try { const property = await Property.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }); if (!property) return response.status(404).json({ message: 'Property not found.' }); return response.json({ property }) } catch (error) { return next(error) } })
router.delete('/properties/:id', async (request, response, next) => { try { await Property.findByIdAndDelete(request.params.id); return response.json({ message: 'Property deleted.' }) } catch (error) { return next(error) } })
router.get('/theme', async (_request, response, next) => { try { const theme = await Theme.findOne({ key: 'global' }); return response.json({ theme: theme?.colors || {} }) } catch (error) { return next(error) } })
router.put('/theme', async (request, response, next) => { try { const theme = await Theme.findOneAndUpdate({ key: 'global' }, { colors: request.body.colors, updatedBy: request.user.sub }, { new: true, upsert: true, runValidators: true }); return response.json({ theme: theme.colors }) } catch (error) { return next(error) } })

export default router
