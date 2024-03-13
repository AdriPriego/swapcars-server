const router = require("express").Router();
const Car = require("../models/Car.model")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)


router.post("/cars", async (req, res, next) => {
  const { name, model, category, year, cv, km, price, image, userCar } = req.body


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
      userCar
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }
})

router.get("/cars", async (req, res, next) => {
  
})

module.exports = router;
