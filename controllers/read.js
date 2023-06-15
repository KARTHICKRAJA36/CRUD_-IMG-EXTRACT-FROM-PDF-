const jwt = require("jsonwebtoken")
const Users = require("../models/users")
const Images = require("../models/images")
const customerrorhandle = require("../controllers/customerror")
const checktoken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        const err = new customerrorhandle(400, 'token is missing...')
        next(err);
    }
    try {
        const decoded = jwt.verify(token, 'secret_key');
        const userId = decoded.userId;


        const user = await Users.findByPk(userId);
        if (!user) {
            const err = new customerrorhandle(400, "Invalid token");
            return next(err);
        }

        const image = await Images.findAll({ where: { userId: user.id } })
        console.log(image);
        res.status(200).json({
            message: "data retrieved successfully...",
            data: user, image
        })

    }
    catch (error) {
        console.log("error" + error);
        const err = new customerrorhandle(500, error.message)
        next(err);
    }
}
module.exports = checktoken