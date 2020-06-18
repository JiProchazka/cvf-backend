const multer = require("multer");
import { v4 as uuidv4 } from "uuid";

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    cb(null, `${uuidv4()}.${extension}`);
  },
});
