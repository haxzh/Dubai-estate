import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  category: { type: String, trim: true, default: 'Real estate' },
  level: { type: String, enum: ['Foundation', 'Intermediate', 'Advanced'], default: 'Foundation' },
  duration: { type: String, required: true, trim: true },
  lessons: { type: Number, min: 0, default: 0 },
  price: { type: Number, min: 0, required: true },
  image: { type: String, trim: true, default: '' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
}, { timestamps: true })

export default mongoose.model('Course', courseSchema)
