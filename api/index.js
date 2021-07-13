require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

/**
 * Routes
 */

const usersRoute = require('./routes/users')
const statusesRoute = require('./routes/statuses')
const patientsRoute = require('./routes/patients')

const app = express()
app.use(cors())
app.options('*', cors())
app.use(express.json())

app.use(morgan('dev'))

const apiURL = process.env.API_URL
const apiPORT = process.env.API_PORT
const mongoURI = process.env.MONGO_URI
const dbNAME = process.env.DB_NAME

app.use(`${apiURL}/doctors`, usersRoute)
app.use(`${apiURL}/statuses`, statusesRoute)
app.use(`${apiURL}/patients`, patientsRoute)

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbNAME
}).then(console.log('Connected to MongoDB.'))

app.listen(apiPORT, () => console.log(`Running HMS on port: ${apiPORT}`))
