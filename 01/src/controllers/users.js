const pool = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `
        insert into users (name, email, password)
        values ($1, $2, $3)
        returning *
      `,
      [name, email, encryptedPassword]
    );

    return res.status(201).json(newUser.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
};
