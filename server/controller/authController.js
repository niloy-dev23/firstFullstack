const userModel = require('../models/userModel')

const registration = async (req, res)=>{
    const {userName, email, password} = req.body
    const picture = req.file.filename
    const userInfo = new userModel({
        userName:userName,
        email:email,
        password:password, 
        picture:picture
    })
    try{
        await userInfo.save()
        res.status(201).json({
            success:true,
            message:'User Created Successfully',
            data:userInfo
        })
    }
    catch(error){
        res.status(404).json({
            success:false,
            message:"User can't be created",
            errorMessage:error
        })
    }
    
}

module.exports = registration