const bcrypt = require('bcrypt')
const knex = require("./database")

const paswordChanger = async (req,res,next)=>{
    let hasrs = await bcrypt.hash(req.body.password,10)
    req.body.password=hasrs
    next()
}

const verifyHash = (req,res,next)=>{
    knex("user3").where({email:req.body.email}).then((result) => {
        if(!bcrypt.compareSync(req.body.password,result[0].password)){
            res.send("Incorrect Password Dubara kar")
        }else{
            next()
        }
    }).catch((err) => {
        
    });
}

module.exports = {paswordChanger,verifyHash}