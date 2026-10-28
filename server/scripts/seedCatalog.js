import 'dotenv/config'
import mongoose from 'mongoose'
import Course from '../models/Course.js'
import Property from '../models/Property.js'
import { courses } from '../../src/data/courses.js'
import { properties } from '../../src/data/properties.js'

function numericPrice(value) {
  const number = Number(String(value).replace(/[^\d.]/g, ''))
  return String(value).includes('M') ? number * 1000000 : number
}

await mongoose.connect(process.env.MONGODB_URI)

const courseOccurrences = new Map()
for (const course of courses) {
  const occurrence = (courseOccurrences.get(course.title) || 0) + 1
  courseOccurrences.set(course.title, occurrence)
  const seedTitle = occurrence === 1 ? course.title : `${course.title} (Edition ${occurrence})`
  await Course.updateOne(
    { title: seedTitle },
    { $set: { title: seedTitle, description: course.description, category: 'Dubai real estate', level: course.level, duration: course.duration, lessons: Number.parseInt(course.duration, 10) || 0, price: numericPrice(course.price), image: course.image, status: 'published' } },
    { upsert: true },
  )
}

for (const property of properties) {
  await Property.updateOne(
    { title: property.title },
    { $set: { title: property.title, description: property.description, location: property.location, type: property.type, purpose: property.purpose === 'For sale' ? 'For sale' : 'For sale', area: Number(String(property.area).replace(/,/g, '')), beds: property.beds, baths: property.baths, price: property.value, currency: 'AED', images: [property.image], status: 'published', illustrative: true, featured: false } },
    { upsert: true },
  )
}

console.log(`Seeded ${courses.length} courses and ${properties.length} illustrative properties.`)
await mongoose.disconnect()
