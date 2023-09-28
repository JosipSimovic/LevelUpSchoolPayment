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
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cnumber, exp, cvv, } = req.body;
    if (req.method === "OPTIONS") {
        return next();
    }
    let approved = false;
    let message = "";
    // Name check
    if (!name) {
        message += "Please insert name.\n";
    }
    // American Express check
    let isAmerican = false;
    let firstDigits = String(cnumber).substring(0, 2);
    if (firstDigits === "34" || firstDigits === "37") {
        isAmerican = true;
    }
    // Card number check
    if (String(cnumber).length < 16 || String(cnumber).length > 19) {
        message +=
            "Card number must be between 16 and 19 digits long. (" +
                String(cnumber).length +
                ")\n";
    }
    else if (!luhnAlgorithm(String(cnumber))) {
        message += "Number failed Luhn alghoritm";
    }
    // Date check
    const date = new Date(exp);
    if (date.getFullYear() < new Date().getFullYear() ||
        date.getMonth() <= new Date().getMonth()) {
        message += "Date must be later than current date.\n";
    }
    // CVV check
    if (isAmerican) {
        if (cvv < 1000 || cvv > 9999) {
            message += "CVV must be 4 digits. (American Express)\n";
        }
    }
    else {
        if (cvv < 100 || cvv > 999) {
            message += "CVV must be 3 digits.";
        }
    }
    console.log("Message: " + message);
    res.status(400);
    if (message === "") {
        res.status(200);
        approved = true;
        message = "Card successfully approved!";
    }
    console.log(approved);
    if (approved) {
        return next();
    }
    else {
        res.json({
            message: message,
        });
    }
});
const luhnAlgorithm = (cardNumber) => {
    const reversedDigits = cardNumber.split("").reverse().map(Number);
    let isEven = false;
    let sum = 0;
    for (let i = 0; i < reversedDigits.length; i++) {
        let digit = reversedDigits[i];
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        isEven = !isEven;
    }
    return sum % 10 === 0;
};
