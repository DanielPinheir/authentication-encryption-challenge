const pool = require("../connection");
const jwt = require("jsonwebtoken");
const passwordJwt = require("../passwordJwt");

const pokemonRegister = async (req, res) => {
  const { name, nickName, skills, image } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, passwordJwt);

    const { rows } = await pool.query(
      `
        insert into pokemons (user_id, name, nickName, skills, image)
        values ($1, $2, $3, $4, $5) returning *
      `,
      [id, name, nickName, skills, image]
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const updateNickName = async (req, res) => {
  const { nickName } = req.body;
  const { id } = req.params;

  const token = req.headers.authorization.split(" ")[1];

  try {
    const { rows, rowCount } = await pool.query(
      `
        select * from pokemons
        where id = $1
      `,
      [id]
    );

    if (rowCount < 1) {
      return res.status(404).json({ message: "Pokemon not found." });
    }

    await pool.query(
      `
        update pokemons set nickName = $1
        where id = $2
      `,
      [nickName, id]
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const pokemonList = async (req, res) => {
  try {
    const { rows, rowCount } = await pool.query(
      `
        select  p.id, u.name as user, p.name, p.nickname, p.skills, p. image 
        from pokemons p
        join users u
        on u.id = p.user_id;
      `
    );

    if (rowCount < 1) {
      return res.status(404).json({ message: "Pokemons not found." });
    }

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const pokemonFind = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await pool.query(
      `
        select  p.id, u.name as user, p.name, p.skills, p. image, p.nickname 
        from pokemons p
        join users u
        on u.id = p.user_id
        where p.id = $1;
      `,
      [id]
    );

    if (rowCount < 1) {
      return res.status(404).json({ message: "Pokemon not found." });
    }
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const pokemonDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query(
      `select * from pokemons where id = $1`,
      [id]
    );

    if (rowCount < 1) {
      return res.status(404).json({ message: "Pokemon not found." });
    }

    await pool.query("delete from pokemons where id = $1", [id]);

    return res.status(204).send();
  } catch (error) {
    return res.status(200).json(rows);
  }
};

module.exports = {
  pokemonRegister,
  updateNickName,
  pokemonList,
  pokemonFind,
  pokemonDelete,
};
