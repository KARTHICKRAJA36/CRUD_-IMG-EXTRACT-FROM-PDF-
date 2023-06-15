const Images = require("../models/images");
const fs = require("fs");
const customerrorhandle = require("../controllers/customerror")

const addImage = async (req, res, next) => {
  const userId = req.params.id;
  const newFile = req.body.filename;

  try {
    const imagesFolderPath = "K:/TRAINING/node/Images/images";
    const newImagePath = `${imagesFolderPath}/${newFile}`;
    const isImageExists = await fs.promises.access(newImagePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!isImageExists) {
      const err = new customerrorhandle(404, "New image file not found")
      return next(err);
    }

    const baseUrl = "http://localhost:3330";
    const newImageUrl = `${baseUrl}/${newFile}`;


    const isDuplicateUrlExists = await Images.findOne({
      where: {
        UserId: userId,
        image: newImageUrl
      }
    });

    if (isDuplicateUrlExists) {
      const err = new customerrorhandle(400, "The new image URL already exists for the specified UserId")
      return next(err)
    }



    await Images.create({
      image: newImageUrl,
      UserId: userId
    });

    res.status(200).json({
      message: "Image added successfully",
      data: newImageUrl, userId
    });
  } catch (error) {
    console.error("Error adding image:", error.message);
    const err = new customerrorhandle(500, error.message)
    next(err);
  }
};

module.exports = addImage;
