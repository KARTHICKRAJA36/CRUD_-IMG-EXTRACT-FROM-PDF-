const Images = require("../models/images");
const customerrorhandle = require("../controllers/customerror")

const deleteImage = async (req, res, next) => {

  const filename = req.params.filename;
  const userId = req.params.id;
  const baseUrl = "http://localhost:3330";
  const imageUrl = `${baseUrl}/${filename}`;


  try {
    const image = await Images.findOne({
      where: {
        UserId: userId,
        image: imageUrl
      }
    });

    if (!image) {
      const err = new customerrorhandle(404, "Image not found or not associated with the specified UserId")
      return next(err)
    }


    await image.destroy();

    res.status(200).json({
      success: "true",
      message: "Image deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    const err = new customerrorhandle(500, error.message)
    next(err);
  }
};

module.exports = deleteImage;
