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
const processCardDummy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Await 2 seconds to simulate processing of card
    yield new Promise((res) => setTimeout(res, 2000));
    res.status(200);
    res.json({
        message: "Card succesfully processed.",
    });
});
module.exports = {
    processCardDummy,
};
