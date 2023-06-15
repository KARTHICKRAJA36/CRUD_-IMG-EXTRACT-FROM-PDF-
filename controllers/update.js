const Images = require("../models/images")
const fs = require("fs")
const customerrorhandle = require("../controllers/customerror")

const updateImage = async (req, res, next) => {
  const imageId = req.body.id
  const newFile = req.body.filename
  const oldfile = req.params.filename

  try {
    const imagesfolderpath = "K:/TRAINING/node/Images/images"
    const newImagePath = `${imagesfolderpath}/${newFile}`;
    const isImageExists = await fs.promises.access(newImagePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!isImageExists) {
      const err = new customerrorhandle(404, "New image file not found")
      return next(err)
    }
    const baseUrl = "http://localhost:3330";
    const imageUrl = `${baseUrl}/${oldfile}`;

    const image = await Images.findOne({
      where: {
        UserId: imageId,
        image: imageUrl
      }
    });

    if (!image) {
      const err = new customerrorhandle(400, "Image not found or not associated with the specified URL")
      return next(err);
    }

    const isDuplicateUrlExists = await Images.findOne({
      where: {
        UserId: imageId,
        image: `${baseUrl}/${newFile}`
      }
    });


    if (isDuplicateUrlExists) {
      const err = new customerrorhandle(400, "The new image URL already exists for the specified UserId")
      return next(err);
    }

    image.image = `http://localhost:3330/${newFile}`;
    await image.save();

    res.status(200).json({
      message: "Image updated successfully",
      data: image
    });
  }
  catch (error) {
    console.error("Error updating image:", error);
    const err = new customerrorhandle(500, error.message)
    next(err);
  }

}
module.exports = updateImage