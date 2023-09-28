import * as express from "express";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { name, cnumber, exp, cvv } = req.body;

  let message: string = "";

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
  if (
    date.getFullYear() < new Date().getFullYear() ||
    date.getMonth() <= new Date().getMonth()
  ) {
    message += "Date must be later than current date.\n";
  }

  if (isAmerican) {
    if (cvv < 1000 || cvv > 9999) {
      message += "CVV must be 4 digits. (American Express)\n";
    }
  } else {
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
});

module.exports = router;
