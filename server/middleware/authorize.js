import User from '../models/User.js'

export async function requireAdmin(request, response, next) {
  try {
    const user = await User.findById(request.user?.sub).select('role status')
    if (!user || user.status !== 'active' || user.role !== 'admin') return response.status(403).json({ message: 'Administrator access required.' })
    request.user.role = user.role
    return next()
  } catch (error) {
    return next(error)
  }
}
