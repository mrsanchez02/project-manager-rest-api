const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const userRoute = require('./router/userRoute')
const projectsRoute = require('./router/projectsRoute')
const connectDB = require('./database/db')

require('dotenv').config()

// Create server.
const app = express()

// connect to database.
connectDB()

// Middelwares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Routes
app.use('/users/', userRoute)
app.use('/projects', projectsRoute)

// Welcome route
app.get('/', (req,res)=> {
  res.send({msg: "works!"})
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})