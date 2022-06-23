const express = require("express")
const path = require('path')
const app = express()
const knex = require("./database");
const { genrateToken, varifiToken } = require("./jwt_authanticat");
const validData = require('./authantication')
const { paswordChanger, verifyHash } = require("./bcrypt_hass")
const multer = require("multer")

// multer k lya h ye

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './images')
    }, filename: (req, file, cd) => {
        cd(null, Date.now() + "--" + file.originalname)
    }
})

const uplode = multer({ storage: fileStorageEngine })
const public_Path= path.join(__dirname, "../public")
app.use(express.json());


app.use(express.static(public_Path))

app.get("/", (req, res) => {
res.send("ready to sarve")
})

app.post("/singup", uplode.single("image"), validData, paswordChanger, (req, res) => {
    knex("user3").where({ email: req.body.email }).then((result) => {
        if (result.length == 0) {
            knex("user3").insert(req.body)
                .then((result) => {
                    // console.log(req.body);
                    res.send("inserted")
                })
        } else {
            res.send("already exist")
        }
    })
})


app.post("/signin", verifyHash, (req, res) => {
    knex("user3").where({ email: req.body.email }).then((result) => {
        const token = genrateToken(result[0])
        res.cookie('signinCookie', token)
        res.send("login Succecful ho gya  or Cooki bhi ban gya")
    })
})

app.get("/profile", varifiToken, (req, res) => {
    res.send(`hello ${req.userData[0].username}`)
})

app.put("/update/:d", varifiToken, (req, res) => {
    knex("user3").where({ "id": req.params.d, }).update(req.body).then((resulr) => {
        res.send("done")
    }).catch((err) => {
        console.log(err);
    })
})

app.delete("/delete/:d", varifiToken, (req, res) => {
    knex("user3").where({ "id": req.params.d }).del().then((result) => {
        res.send("deleted")
    }).catch((err) => {
        console.log(err);
    });
})

app.get("*", (req, res) => {
res.send("ooo kya kar raha h api ssahi likhh naaa....!!!!")
})

app.listen(4040, () => {
    console.log("Chal raha Hai");
})