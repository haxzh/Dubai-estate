import mongoose from 'mongoose'

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  description: { type: String, required: true, trim: true, maxlength: 1200 },
  location: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  purpose: { type: String, enum: ['For sale', 'For rent'], default: 'For sale' },
  area: { type: Number, min: 0, required: true },
  beds: { type: Number, min: 0, required: true },
  baths: { type: Number, min: 0, required: true },
  price: { type: Number, min: 0, required: true },
  currency: { type: String, default: 'AED', trim: true },
  images: [{ type: String, trim: true }],
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published', 'unavailable'], default: 'draft', index: true },
  illustrative: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Property', propertySchema)
