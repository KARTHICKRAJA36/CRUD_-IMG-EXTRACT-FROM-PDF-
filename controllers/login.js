const Users = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const customerrorhandle = require("../controllers/customerror")
const login = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const user = await Users.findOne({ where: { name } })
    if (!user) {
      const err = new customerrorhandle(404, 'user not found')
      return next(err);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const err = new customerrorhandle(404, 'wrong password')
      return next(err);
    }
    const token = jwt.sign({ userId: user.id }, 'secret_key');

    res.status(200).json({
      message: "logeed in successfully",
      token: token
    })

  }
  catch (error) {
    console.error(error);
    const err = new customerrorhandle(500, error.message)
    next(err)

  }
}
module.exports = login