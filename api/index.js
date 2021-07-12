require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

/**
 * Routes
 */

const patientsRoute = require('./routes/users')
const statusesRoute = require('./routes/statuses')

const app = express()
app.use(cors())
app.options('*', cors())
app.use(express.json())

app.use(morgan('dev'))

const apiURL = process.env.API_URL
const apiPORT = process.env.API_PORT
const mongoURI = process.env.MONGO_URI
const dbNAME = process.env.DB_NAME

app.use(`${apiURL}/patients`, patientsRoute)
app.use(`${apiURL}/statuses`, statusesRoute)

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbNAME
}).then(console.log('Connected to MongoDB.'))

app.listen(apiPORT, () => console.log(`Running HMS on port: ${apiPORT}`))
