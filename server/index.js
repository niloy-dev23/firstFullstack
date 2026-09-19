const dns = require('node:dns')
require('dotenv').config()
var cors = require('cors')
const express = require('express')
const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())
const registration = require('./controller/authController.js')
let dashboardLogin = require('./controller/dashboardLogin.js')
let dashboardMiddlware = require('./middleware/dashboardMiddleware.js')
let dbConfig = require('./config/dbConfig.js')
dbConfig()
let deleteController = require('./controller/deleteController.js')
let updateController = require('./controller/updateController.js')
let getAllUsers = require('./controller/getAllUsers.js')
dns.setServers(['8.8.8.8','1.1.1.1'])

app.get('/', (req, res)=>{
    res.send('First server running on my pc')
})

app.post("/registration", registration)
app.post('/dashboard',dashboardMiddlware, dashboardLogin)
app.delete('/delete/:id', deleteController)
app.post('/update/:id', updateController)
app.get('/getAllUsers', getAllUsers)

app.listen(port, ()=>{
    console.log('Server is running on port:', port)
})