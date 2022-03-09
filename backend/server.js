require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const controllers = require('./Controllers')

app.use('/api', controllers)

app.listen(port, () => console.log(`app running on port ${port}`))
