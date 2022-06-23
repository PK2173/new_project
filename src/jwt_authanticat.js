const jwt = require('jsonwebtoken')
const knex = require('./database')


const genrateToken = ({ id }) => {
    return jwt.sign(id, "praveenwertyuidfghrtyufdfghuruik")
}


const varifiToken = async (req, res, next) => {
    if (req.headers.cookie) {
        const token = req.headers.cookie.split("=")[1]
        const id = jwt.verify(token, "praveenwertyuidfghrtyufdfghuruik")
        const user = await knex("user3").where({ id })
        // console.log(user);
        req.userData = user
        next()
    } else {
        res.send("nahi hua token expaire ho gya")
    }
}

module.exports = { genrateToken, varifiToken }
