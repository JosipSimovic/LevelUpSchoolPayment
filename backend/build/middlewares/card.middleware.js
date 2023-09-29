"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMiddleware = void 0;
const bind_decorator_1 = __importDefault(require("bind-decorator"));
class CardMiddleware {
    constructor(cardService) {
        this.cardService = cardService;
    }
    verifyCard(req, res, next) {
        const { name, cnumber, exp, cvv, } = req.body;
        const cvvCheck = this.cardService.checkCvv(cnumber, cvv);
        if (!cvvCheck.status) {
            return res.status(400).json({ message: cvvCheck.message });
        }
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
        next();
    }
}
exports.CardMiddleware = CardMiddleware;
__decorate([
    bind_decorator_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], CardMiddleware.prototype, "verifyCard", null);
