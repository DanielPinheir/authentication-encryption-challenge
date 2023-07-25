const jwt = require("jsonwebtoken");
const pool = require("../connection");
const passwordJwt = require("../passwordJwt");

const loginVerifyUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, passwordJwt);

    const { rows, rowCount } = await pool.query(
      `
        select * from users
        where id = $1
      `,
      [id]
    );

    if (rowCount < 1) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = rows[0];

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = loginVerifyUser;
