const express = require("express");
const router = express.Router();
const verificationsController = require("../controllers/verificationsController");
const testController = require("../controllers/testController");
const filesController = require("../controllers/filesController");
const { catchErrors } = require("../handlers/errorHandlers");
const multer = require("multer");
const { storage } = require("../lib/multer");
const upload = multer({ storage });

router.get("/test", catchErrors(testController.testApi));

router.post("/verifications", catchErrors(verificationsController.create));
router.get("/verifications/:id", catchErrors(verificationsController.get));
router.put("/verifications/:id", catchErrors(verificationsController.update));

router.get("/files/:file", filesController.get);
router.post(
  "/files/upload/:id/:fileType",
  upload.single("file"),
  catchErrors(filesController.upload)
);

module.exports = router;
