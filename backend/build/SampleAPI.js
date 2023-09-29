"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardController = exports.CardMiddleware = exports.CardService = void 0;
// card.service.ts
class CardService {
    confirmPayment(cardNum, cvv) {
        return { message: `Paid with: ${cardNum} with cvv: ${cvv}` };
    }
    verifyCVV(cardNum, cvv) {
        // implement verification logic and PLEASE USE MORE PRIVATE METHODS FOR IMPL
    }
    verifyCardNumber(cardNum) {
        return this.verifyWithLuhnAlg(cardNum);
    }
    verifyWithLuhnAlg(cardNum) {
        // luhn's algorithm implementation
        return true;
    }
}
exports.CardService = CardService;
// card.middleware.ts
class CardMiddleware {
    constructor(cardService) {
        this.cardService = cardService;
    }
    verifyCard(req, res, next) {
        const { cardNum, cvv } = req.body;
        const isValidCardNum = this.cardService.verifyCardNumber(cardNum);
        if (!isValidCardNum) {
            return res.status(400).json({ error: 'Invalid card num' });
        }
        const isValidCVV = this.cardService.verifyCVV(cardNum, cvv);
        if (!isValidCVV) {
            return res.status(400).json({ error: 'Invalid cvv' });
        }
        next();
    }
}
exports.CardMiddleware = CardMiddleware;
//card.controller.ts
class CardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    confirmPayment(req, res) {
        const { cardNum, cvv } = req.body;
        res.json(this.cardService.confirmPayment(cardNum, cvv));
    }
}
exports.CardController = CardController;
// app.ts
const card_service_1 = require("./card.service");
const card_middleware_1 = require("./card.middleware");
const card_controller_1 = require("./card.controller");
app = express();
const cardService = new card_service_1.CardService();
const cardMiddleware = new card_middleware_1.CardMiddleware(cardService);
const cardController = new card_controller_1.CardController(cardService);
app.use("/card", cardMiddleware.verifyCard);
app.use("/card", cardController.confirmPayment);
app.listen(5000);
