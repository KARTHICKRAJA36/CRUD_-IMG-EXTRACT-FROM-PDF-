const customerrorhandle = require("../controllers/customerror")

const preview = (req, res, next) => {
    try {
        const filename = req.params.filename;
        const imagePath = `K:/TRAINING/node/Images/images/${filename}`;
        res.sendFile(imagePath);
    }
    catch (error) {
        console.log(error);
        const err = new customerrorhandle(400, error.message)
        next(err);
    }
}
module.exports = preview
