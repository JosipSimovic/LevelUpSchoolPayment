import { CardService } from "../services/card.service";
import { Request, Response, NextFunction } from "express";
import bind from "bind-decorator";

export class CardMiddleware {
  constructor(private readonly cardService: CardService) {}

  @bind
  verifyCard(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      cnumber,
      exp,
      cvv,
    }: { name: string; cnumber: number; exp: string; cvv: number } = req.body;

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
