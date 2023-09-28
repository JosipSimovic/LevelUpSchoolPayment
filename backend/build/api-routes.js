"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express = __importStar(require("express"));
const router = express.Router();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cnumber, exp, cvv } = req.body;
    let message = "";
    if (!name) {
        message += "Please insert name.\n";
    }
    let isAmerican = false;
    let firstDigits = String(cnumber).substring(0, 2);
    if (firstDigits === "34" || firstDigits === "37") {
        isAmerican = true;
    }
    if (String(cnumber).length < 16 || String(cnumber).length > 19) {
        message +=
            "Card number must be between 16 and 19 digits long. (" +
                String(cnumber).length +
                ")\n";
    }
    const date = new Date(exp);
    if (date.getFullYear() < new Date().getFullYear() ||
        date.getMonth() <= new Date().getMonth()) {
        message += "Date must be later than current date.\n";
    }
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
    res.status(400);
    if (message === "") {
        res.status(200);
        message = "Card successfully approved!";
    }
    res.json({
        message: message,
    });
}));
module.exports = router;
