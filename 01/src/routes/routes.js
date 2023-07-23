const { Router } = require("express");

const { registerUser, login } = require("../controllers/users");

const route = Router();

route.post("/user", registerUser);
route.post("/login", login);

module.exports = route;
