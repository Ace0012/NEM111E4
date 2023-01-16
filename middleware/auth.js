const jwt = require("jsonwebtoken");
require("dotenv").config()
console.log(process.env.SECRET_KEY)


const authentication = (req,res,next)=>{
    const token = req.header.Authorization 

    console.log(token)
    if(!token){

        res.send("please login first")
    }


    const decoded = jwt.verify(token,process.env.SECERET_KEY)
    if(decoded){
        req.body.user_id = user_id
        next()
    }
    else{
        res.send("please login first ")

    }

}

module.exports = {authentication}