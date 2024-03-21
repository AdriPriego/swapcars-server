const router = require("express").Router();
const e = require("express");
const Car = require("../models/Car.model")
const Question = require("../models/Question.model") 
const fileUploader = require("../config/cloudinary.config")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./user.routes")
router.use("user",userRouter)

const carRouter = require("./cars.routes")
router.use("/cars", carRouter)

const questionRouter = require("./question.routes")
router.use("/question", questionRouter)

router.get("/category/:categoryName", async (req, res, next) => {
  try {
    const carCategory = await Car.find({category: req.params.categoryName})

    res.status(200).json(carCategory)
  } catch (error) {
    next(error)
  }
})

router.get("/search", async (req, res, next) => {
  try {
    
    const {query} = req.query
    console.log(query)

    const cars = await Car.find({"name": {"$regex": query, "$options": "i"}})

    res.status(200).json(cars)

  } catch (error) {
    next(error)
  }
})

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  console.log("file is:", req.file)

  if (!req.file) {
    next(new Error("No se ha subido el archivo"))
    return
  }

  res.json({fileUrl: req.file.path})
})
module.exports = router;
