"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMiddleware = void 0;
class CardMiddleware {
    constructor(cardService) {
        this.cardService = cardService;
        this.verifyCard = (req, res, next) => {
            const { name, cnumber, exp, cvv, } = req.body;
            if (!name) {
                return res.status(400).json({ message: "Please insert name." });
            }
            const cnumberCheck = this.cardService.checkCardNumber(cnumber);
            if (!cnumberCheck.status) {
                return res.status(400).json({ message: cnumberCheck.message });
            }
            if (!this.cardService.checkDate(new Date(exp))) {
                return res
                    .status(400)
                    .json({ message: "Date must be later than present date." });
            }
            const cvvCheck = this.cardService.checkCvv(cnumber, cvv);
            if (!cvvCheck.status) {
                return res.status(400).json({ message: cvvCheck.message });
            }
            next();
        };
    }
}
exports.CardMiddleware = CardMiddleware;
