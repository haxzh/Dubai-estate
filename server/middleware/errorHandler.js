export default function errorHandler(error, _request, response, _next) {
  if (error.code === 11000) return response.status(409).json({ message: 'An account with this email already exists.' })
  console.error(error)
  return response.status(500).json({ message: 'Something went wrong on the server.' })
}
