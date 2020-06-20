const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    const extArray = file.originalname.split(".");
    const extension = extArray[extArray.length - 1];
    cb(null, `${uuidv4()}.${extension}`);
  },
});
