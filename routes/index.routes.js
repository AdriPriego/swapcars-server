const router = require("express").Router();
const e = require("express");
const Car = require("../models/Car.model")
const Question = require("../models/Question.model") 

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./user.routes")
router.use("user",userRouter)


router.post("/cars", async (req, res, next) => {
  const { name, model, category, year, cv, km, price, image, userCar } = req.body
  const userId = req.params.userId // final de la clase de auth del backend, para saber de donde viene el usuario logeado

  try {
    Car.create({
      name,
      model,
      category,
      year,
      cv,
      km,
      price,
      image,
      userCar: userId
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }
})

router.get("/cars", async (req, res, next) => {
  try {
    const cars = await Car.find()
    
    res.status(200).json(cars)
  } catch (error) {
    next(error)
  }
})

router.get("/category/:categoryName", async (req, res, next) => {
  try {
    const carCategory = await Car.find({category: req.params.categoryName})

    res.status(200).json(carCategory)
  } catch (error) {
    next(error)
  }
})

router.get("/cars/:carId", async (req, res, next) => {
  const carId = req.params.carId
  console.log(carId)

  try {
    const carDetail = await Car.findById(carId)

    if(carDetail === null) {
      res.status(404).json({messageError: "coche no encontrado"})
    }

    res.status(200).json(carDetail)
  } catch (error) {
    next(error)
  }
})

router.put("/cars/:carId", async (req, res, next) => {
  const carId = req.params.carId
  console.log(carId)

  const { name, model, category, year, cv, km, price, image } = req.body

  try {
    
    const response = await Car.findByIdAndUpdate(carId, {
      name, 
      model, 
      category, 
      year, 
      cv, 
      km, 
      price, 
      image
    }, {new: true})

    res.status(202).json(response)
  } catch (error) {
    next(error)
  }
})

router.delete("/cars/:carId", async (req, res, next) => {
  const carId = req.params.carId

  try {
    const response = await Car.findByIdAndDelete(carId)
    res.status(202).json({message: "coche eliminado"})
  } catch (error) {
    next(error)
  }
})


router.post("/question/:carId", async (req, res, next) => {
  const {question} = req.body
  const carId = req.params.carId
  
  try {
    
     Question.create({
      question,
      car: carId
      //añadir el dueño de la pregunta
     })

     res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.put("/question/:questionId", async (req, res, next) => {
  const {question} = req.body
  const questionId = req.params.questionId

  try {
    
    const response = await Question.findByIdAndUpdate(questionId, {
      question
    }, {new: true})

    res.status(202).json(response)
  } catch (error) {
    next(error)
  }
})

router.delete("/question/:questionId", async (req, res, next) => {
  const questionId = req.params.questionId

  try {
    
    await Question.findByIdAndDelete(questionId)

    res.status(202).json({message: "pregunta eliminada"})
  } catch (error) {
    next(error)
  }
})

router.get("/question/:carId", async (req, res, next) => {
  const carId = req.params.carId

  try {
    
    const questions = await Question.find({car: carId})

    res.status(200).json(questions)
  } catch (error) {
    next(error)
  }

}) 
module.exports = router;
