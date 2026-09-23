const express = require('express')
const router = express.Router()
const multer = require('multer')
const registration = require('../../controller/authController')

const uploadStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads')
    },
    filename: function (req, file, cb){
        const uniqueSuffix = 'img- ' + file.originalname
        cb(null, file.fieldname + uniqueSuffix)
    }
})

const upload = multer({storage: uploadStorage})
router.post('/registration', upload.single('picture'), registration)

module.exports = router