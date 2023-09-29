"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardController = void 0;
class CardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    confirmPayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cnumber, cvv } = req.body;
            res.status(200).json({
                message: `Payment succesfull for card '${cnumber}' with CVV '${cvv}'`,
            });
        });
    }
}
exports.CardController = CardController;
