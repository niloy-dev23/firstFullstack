const express = require('express')
const router = express.Router()
const apiURL = process.env.BASE_URL
const auths = require('./api/authRoute')

router.use(apiURL, auths)

module.exports = router