const router = require("express").Router()
const Car = require("../models/Car.model")
const fileUploader = require("../config/cloudinary.config")
const {isTokenValid} = require("../middlewares/auth.middlewares")

router.post("/", isTokenValid, async (req, res, next) => {
  const { name, model, category, year, cv, km, price, imageUrl, userCar } = req.body
  console.log(req.body)
  const userId = req.payload._id
  console.log(req.headers)

  try {
    await Car.create({
      name,
      model,
      category,
      year,
      cv,
      km,
      price,
      imageUrl,
      userCar: userId
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }
})
router.get("/", async (req, res, next) => {
  try {
    const cars = await Car.find().populate("userCar", "name location")
    
    res.status(200).json(cars)
  } catch (error) {
    next(error)
  }
})
router.get("/:carId", async (req, res, next) => {
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
router.put("/:carId", async (req, res, next) => {
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
router.delete("/:carId", async (req, res, next) => {
  const carId = req.params.carId

  try {
    const response = await Car.findByIdAndDelete(carId)
    res.status(202).json({message: "coche eliminado"})
  } catch (error) {
    next(error)
  }
})

module.exports = router