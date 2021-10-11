const express = require("express");
const carsRouter = require("./cars/cars-router");

const server = express();

// DO YOUR MAGIC
server.use(express.json());
// Enable Cars Router.
server.use('/api/cars', carsRouter);

server.use("*", (_req, _res, next) => {
    next({ status: 404, message: "not found"})
})

// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})
module.exports = server;