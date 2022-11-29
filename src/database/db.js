const mongoose = require('mongoose')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const database = 'project-manager'
const URI = `${DB_HOST}/${database}`

const connectDB = async () => {
  try {
    await mongoose.connect(URI)
    console.log('db connected')
  } catch (error) {
    console.log(error)
    process.exit(1) //Which will stop the app if an error occurs
  }
}

module.exports = connectDB