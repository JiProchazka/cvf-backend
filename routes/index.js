const express = require("express");
const router = express.Router();
const verificationsController = require("../controllers/verificationsController");
const testController = require("../controllers/testController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/test", catchErrors(testController.testApi));

router.post("/verifications", catchErrors(verificationsController.create));
router.get("/verifications/:id", catchErrors(verificationsController.get));
router.put("/verifications/:id", catchErrors(verificationsController.update));

module.exports = router;
