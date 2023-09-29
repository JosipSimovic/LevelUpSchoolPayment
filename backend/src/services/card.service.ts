export class CardService {
  confirmPayment(cnumber: number, cvv: number) {
    return { message: `Payment succesfull with card ${cnumber}` };
  }

  checkCvv(cnumber: number, cvv: number): { status: boolean; message: string } {
    // American Express check
    let isAmerican = false;
    let firstDigits = String(cnumber).substring(0, 2);
    if (firstDigits === "34" || firstDigits === "37") {
      isAmerican = true;
    }

    // CVV check
    let message = "";
    if (isAmerican) {
      if (cvv < 1000 || cvv > 9999) {
        message += "CVV must be 4 digits. (American Express)\n";
      }
    } else {
      if (cvv < 100 || cvv > 999) {
        message += "CVV must be 3 digits.";
      }
    }

    return { status: message === "" ? true : false, message };
  }

  checkDate(date: Date) {
    if (
      date.getFullYear() < new Date().getFullYear() ||
      date.getMonth() <= new Date().getMonth()
    ) {
      return false;
    }
    return true;
  }

  checkCardNumber(cnumber: number): { status: boolean; message: string } {
    if (String(cnumber).length < 16 || String(cnumber).length > 19) {
      return {
        status: false,
        message: "Card length must be between 16 and 19 digits.",
      };
    }
    return this.checkLuhnAlghoritm(cnumber);
  }

  private checkLuhnAlghoritm(cnumber: number) {
    const reversedDigits = String(cnumber).split("").reverse().map(Number);

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

    if (sum % 10 === 0) {
      return { status: true, message: "Card passed Luhn alghoritm" };
    } else {
      return { status: false, message: "Card failed Luhn alghoritm" };
    }
  }
}
