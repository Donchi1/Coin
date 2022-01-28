require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 5000

const controls = require('./controllers')

app.use(cors())
app.use('/api/', controls)

app.listen(port, () => console.log(`app running on port ${port}`))
