const pdfpoppler = require("pdf-poppler");
const Images = require("../models/images");
const Users = require("../models/users");
const fs = require("fs");
const customerrorhandle = require("../controllers/customerror");

const pdftoimage = async (req, res, next) => {
  const pdfPath = req.file.path;
  const outputDir = "K:/TRAINING/node/Images/images";
  const baseUrl = "http://localhost:3330";

  const options = {
    format: "jpeg",
    out_dir: outputDir,
    out_prefix: "image_",
    page: null,
  };

  pdfpoppler
    .convert(pdfPath, options)
    .then(async (result) => {
      console.log("Images extracted successfully...");
      const files = await fs.promises.readdir(outputDir);

      const userCount = await Users.count();
      const userIds = Array.from({ length: userCount }, (_, index) => index + 1);

      const images = files.map((file, index) => {
        const imageUrl = `${baseUrl}/${file}`;
        return {
          image: imageUrl,
          UserId: userIds[index % userCount],
        };
      });

      await Images.bulkCreate(images);
      res.status(200).json({
        message: "Images added into the database successfully..",
        data: images,
      });
    })
    .catch((error) => {
      console.error("Error extracting images:", error);
      const err = new customerrorhandle(400, error.message);
      next(err);
    });
};

module.exports = pdftoimage

