const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "makos24",
  api_key: process.env.API_KEY || "852653254813714",
  api_secret: process.env.API_SECRET || "OR_PxhuAxVJTbf_2t2vZIj8lpH4"
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "teamwork",
  allowedFormats: ["jpg", "png", "gif"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

module.exports = {
  parser
};
