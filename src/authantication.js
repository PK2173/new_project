const joi = require("joi")

const validData = (req,res,next)=>{
    const schemaValid = joi.object({
        username:joi.string().required(),
        email:joi.string().required().email(),
        password:joi.string().min(2).max(8).required(),
        phone:joi.required()
    })
    let data = schemaValid.validate(req.body)
    if (data.error){
        res.send("not valid data dubara bhar or bhejj")
    }else{
        next()
    }
}




module.exports = validData