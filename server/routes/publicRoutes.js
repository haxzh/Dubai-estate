import { Router } from 'express'
import Course from '../models/Course.js'
import Property from '../models/Property.js'
import Theme from '../models/Theme.js'

const router = Router()
router.get('/courses', async (_request, response, next) => {
  try { return response.json({ items: await Course.find({ status: 'published' }).sort({ createdAt: -1 }) }) } catch (error) { return next(error) }
})
router.get('/properties', async (_request, response, next) => {
  try { return response.json({ items: await Property.find({ status: 'published' }).sort({ featured: -1, createdAt: -1 }) }) } catch (error) { return next(error) }
})
router.get('/theme', async (_request, response, next) => {
  try { const theme = await Theme.findOne({ key: 'global' }); return response.json({ theme: theme?.colors || {} }) } catch (error) { return next(error) }
})
export default router
