import express from "express";
import { CardService } from "./services/card.service";
import { CardMiddleware } from "./middlewares/card.middleware";
import cors from "cors";

import bodyParser from "body-parser";
import { CardController } from "./controllers/card.controller";

const cardService = new CardService();
const cardMiddleware = new CardMiddleware(cardService);
const cardController = new CardController(cardService);

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/card", cardMiddleware.verifyCard);

app.use("/card", cardController.confirmPayment);

app.listen(5000);
console.log("Listening on port 5000");
