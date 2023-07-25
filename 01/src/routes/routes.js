const { Router } = require("express");

const { registerUser, login } = require("../controllers/users");
const {
  pokemonRegister,
  updateNickName,
  pokemonList,
  pokemonFind,
  pokemonDelete,
} = require("../controllers/pokemons");
const loginVerifyUser = require("../middlewares/authentication");

const route = Router();
//user
route.post("/user", registerUser);
route.post("/login", login);

route.use(loginVerifyUser);

//pokemon
route.post("/pokemon", pokemonRegister);
route.patch("/pokemon/:id", updateNickName);
route.get("/pokemon", pokemonList);
route.get("/pokemon/:id", pokemonFind);
route.delete("/pokemon/:id", pokemonDelete);

module.exports = route;
