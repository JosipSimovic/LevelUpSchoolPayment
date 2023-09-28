import { Request, Response, NextFunction } from "express";

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    cnumber,
    exp,
    cvv,
  }: { name: string; cnumber: number; exp: string; cvv: number } = req.body;

  if (req.method === "OPTIONS") {
    return next();
  }

  let approved = false;

  let message: string = "";

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

  // Date check
  const date = new Date(exp);
  if (
    date.getFullYear() < new Date().getFullYear() ||
    date.getMonth() <= new Date().getMonth()
  ) {
    message += "Date must be later than current date.\n";
  }

  // CVV check
  if (isAmerican) {
    if (cvv < 1000 || cvv > 9999) {
      message += "CVV must be 4 digits. (American Express)\n";
    }
  } else {
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
  } else {
    res.json({
      message: message,
    });
  }
};
