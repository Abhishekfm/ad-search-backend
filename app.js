require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const connectToDb = require('./config/db')
const { uplaodXl } = require('./controllers/search')
const userRoute = require('./routes/user.routes')

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({
    extended:true
}))

connectToDb();
// uplaodXl();

app.use("/api", userRoute)

module.exports = app