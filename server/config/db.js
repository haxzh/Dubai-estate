import mongoose from 'mongoose'

export default function connectDatabase() {
  return mongoose.connect(process.env.MONGODB_URI)
}
