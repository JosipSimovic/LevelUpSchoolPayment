import * as express from "express";

const router = express.Router();
const controllers = require("../controllers/api-controllers");
const cardChecker = require("../middlewares/card-checker");

router.use(cardChecker);

router.post("/", controllers.processCardDummy);

module.exports = router;
