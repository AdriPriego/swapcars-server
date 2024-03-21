const jwt = require("jsonwebtoken")

function isTokenValid(req, res, next) {

    try {
        console.log(req.headers.authorization)

        const tokenArr = req.headers.authorization.split(" ")
        console.log(tokenArr)


        const tokenType = tokenArr[0]
        const token = tokenArr[1]

        const payload = jwt.verify(token, process.env.TOKEN_SECRET)

        console.log(payload)

        req.payload = payload
        next()
    } catch (error) {
        console.log(error)
        res.sendStatus(401).json({ errorMessage: "token no valid or caducate" })
    }
}

module.exports = {
    isTokenValid
}