const Images = require("../models/images")
const customerrorhandle = require("../controllers/customerror")

const allimages = async (req, res, next) => {
    try {
        const images = await Images.findAll()
        res.status(200).json({
            status: "success",
            message: "all datas in images table extracted successfully..",
            data: images
        })
    }
    catch (error) {
        console.log(error);
        const err = new customerrorhandle(400, error.message)
        next(err);
    }


}
module.exports = allimages;