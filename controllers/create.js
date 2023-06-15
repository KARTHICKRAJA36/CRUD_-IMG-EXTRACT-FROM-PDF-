const Users = require("../models/users")
const bcrypt = require("bcrypt")
const customerrorhandle = require("../controllers/customerror")
const createuser = async (req, res, next) => {
    const { name, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    Users.create({
        name,
        password: hashedPassword
    })
        .then((user) => {
            console.log("Users data added successfully...");
            res.status(200).json({
                message: "Users data added successfully",
                data: user
            })
        })
        .catch((error) => {
            console.log("error occurs while add data" + error);
            const err = new customerrorhandle(404, error.message)
            next(err);
        })
}

module.exports = createuser