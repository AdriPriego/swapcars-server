const router = require("express").Router()
const Question = require("../models/Question.model")
const {isTokenValid} = require("../middlewares/auth.middlewares")


router.post("/:carId", isTokenValid, async (req, res, next) => {
    const { question } = req.body
    const carId = req.params.carId
    const userId = req.payload._id
    const userName = req.payload.name

    try {

        Question.create({
            question,
            car: carId,
            user: userId,
            userName: userName
        })

        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})

router.put("/:questionId", isTokenValid, async (req, res, next) => {
    const { question } = req.body
    const questionId = req.params.questionId

    try {

        const response = await Question.findByIdAndUpdate(questionId, {
            question
        }, { new: true })

        res.status(202).json(response)
    } catch (error) {
        next(error)
    }
})


router.delete("/:questionId", isTokenValid, async (req, res, next) => {
    const questionId = req.params.questionId
    console.log(questionId)
    try {

        await Question.findByIdAndDelete(questionId)

        res.status(202).json({ message: "pregunta eliminada" })
    } catch (error) {
        next(error)
    }
})

router.get("/:carId", async (req, res, next) => {
    const carId = req.params.carId

    try {

        const questions = await Question.find({ car: carId }).populate("car", "userCar")

        res.status(200).json(questions)
    } catch (error) {
        next(error)
    }

})

module.exports = router