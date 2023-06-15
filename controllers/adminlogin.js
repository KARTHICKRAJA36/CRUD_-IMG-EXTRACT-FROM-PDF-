const Users = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const customerrorhandle = require("../controllers/customerror")
const adminlogin = async (req, res, next) => {
    try {
        const name = req.body.name
        const password = req.body.password
        const admin = await Users.findOne({ where: { name } })
        if (!admin) {
            const err = new customerrorhandle(404, 'invalid user')
            return next(err);
        }
        const isPasswordvalid = await bcrypt.compare(password, admin.password)
        if (!isPasswordvalid) {
            const err = new customerrorhandle(400, 'wrong password')
            return next(err)
        }

        const token = jwt.sign({ adminId: admin.id }, 'admin_sceret_key');
        res.status(200).json({
            status: "success",
            message: "Admin logged in successfully...",
            adminToken: token
        })

    }
    catch (error) {
        console.log("during admin loggin" + error.message);
        const err = new customerrorhandle(500, error.message)
        next(err);
    }

}
module.exports = adminlogin