const express = require('express')
const app = express()
const {PORT, DB_URL} = require('./configuration/config') 
const mongoose = require('mongoose')
const adminRouter = require('./routes/adminRoute')
const userRouter = require('./routes/userRoute')

app.get('/', (request, response) => {
    response.status(200).json({message : 'API is running successfully..'})
})

app.use(express.json())

mongoose.connect(DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully!'))

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})