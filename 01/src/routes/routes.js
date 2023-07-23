const { Router } = require("express");

const { registerUser } = require("../controllers/users");

const route = Router();

route.post("/user", registerUser);

module.exports = route;
