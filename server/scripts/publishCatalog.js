import 'dotenv/config'
import mongoose from 'mongoose'
import Course from '../models/Course.js'
import Property from '../models/Property.js'

await mongoose.connect(process.env.MONGODB_URI)
const courses = await Course.updateMany({ status: 'draft' }, { $set: { status: 'published' } })
const properties = await Property.updateMany({ status: 'draft' }, { $set: { status: 'published' } })
console.log(`Published ${courses.modifiedCount} draft courses and ${properties.modifiedCount} draft properties.`)
await mongoose.disconnect()
