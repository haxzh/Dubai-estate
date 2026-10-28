import mongoose from 'mongoose'

const themeSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: 'global' },
  colors: { type: Map, of: String, required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export default mongoose.model('Theme', themeSchema)
