const express = require("express");
const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars);
  } catch (error) {
    next({ status: 500, message: "Internal Server Error" });
  }
});
router.get("/:id", checkCarId, async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    res.json(car);
  } catch (error) {
    next({ status: 500, message: "Internal Server Error" });
  }
});
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    Cars.create(req.body).then(resolv => {
        res.json(resolv)
    })
  }
);

module.exports = router;