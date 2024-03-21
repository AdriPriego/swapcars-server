const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {isTokenValid} = require("../middlewares/auth.middlewares")


// RUTA PARA REGISTRARSE
router.post("/signup", async (req, res, next) => {
   const {name, email, password, location} = req.body
   console.log(name, email, password, location)

   if(!name || !email || !password || !location) {
    res.status(400).json({message: "Todos los campos tienen que estar llenos"})
    return
   }

   //Regex controlar contraseña y email bien echos
   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
   if (passwordRegex.test(password) === false) {
    res.status(400).json({message: "la contraseña debe tener almenos 8 caracteres, 1 mayus y 1 min y 1 num"})
    return
   }

   const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
   if (emailRegex.test(email) === false) {
    res.status(400).json({message: "el correo falla"})
    return
   }

    try {
        const foundUser = await User.findOne({email: email})
        if (foundUser !== null) {
            res.status(400).json({message: "el usuario ya exsiste"})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)
        console.log(hashPassword)

        await User.create({
            name,
            email,
            password: hashPassword,
            location
    })
            res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})


//Ruta para INICIAR SESSION
router.post("/login", async (req, res, next) => {
    const {email, password} = req.body
    console.log(email, password)

    if (!email || !password) {
        res.status(400).json({message: "Todos los campos son obligatorios"})
        return
    }

    try {
        const foundUser = await User.findOne({email: email})
        if (foundUser === null) {
            res.status(400).json({message: "no se ha encontrado ningun usuario"})
        }

        const passwordCorrect = await bcrypt.compare(password, foundUser.password)
        if (passwordCorrect === false) {
            res.status(400).json({message: "contraseña no valida"})
        }

        const payload = {
            _id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name
        }

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm:"HS256",
            expiresIn: "7d"
        })

        res.status(200).json({authToken: authToken})
        
    } catch (error) {
        next(error)
    }
})

router.get("/verify", isTokenValid, (req, res, next) => {

    console.log(req.payload)

    res.json(req.payload)

})



module.exports = router