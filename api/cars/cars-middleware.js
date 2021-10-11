const Cars = require("./cars-model");
const vinV = require("vin-validator");

const requiredFields = ["vin", "make", "model", "mileage"];
const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    console.log(car)
    if (!car) {
      next({
        status: 404,
        message: `car with id ${req.params.id} is not found`,
      });
    } else {
      req.car = car;
      next();
    }
  } catch (error) {
    next({ status: 500, message: "Internal Server Error" });
  }
};

const checkCarPayload = (req, res, next) => {
  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      next({
        status: 400,
        message: `${field} is missing`,
      });
    }
  });
  next();
};

const checkVinNumberValid = (req, res, next) => {
  if (vinV.validate(req.body.vin)) {
    next();
  } else {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    if (await Cars.getByVin(req.body.vin)) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next({ status: 500, message: "Internal server error." });
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};