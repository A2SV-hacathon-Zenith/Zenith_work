const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const path = require('path')
const fileupload = require('express-fileupload')

// load env files
dotenv.config({path: './config/config.env'})

// route files
const users = require('./routes/users')
const jobs = require('./routes/jobs')
const auth = require('./routes/auth')
const students = require('./routes/students')

// connect to database

connectDB()

const app = express()


app.use(cors())

// Body parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// File uploading
app.use(fileupload())

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// mount routers

app.use('/api/v1/users', users)
app.use('/api/v1/jobs', jobs)
app.use('/api/v1/auth', auth)
app.use('/api/v1/students', students)


// error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT
const server = app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold))

// handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    server.close(() => process.exit(1))
})