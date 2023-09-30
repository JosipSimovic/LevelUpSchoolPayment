import { Request, Response, NextFunction } from "express";
import { CardService } from "../services/card.service";
import bind from "bind-decorator";

export class CardController {
  constructor(private readonly cardService: CardService) {}

  @bind
  async confirmPayment(req: Request, res: Response, next: NextFunction) {
    const { cnumber, cvv }: { cnumber: number; cvv: number } = req.body;

    res.status(200).json(this.cardService.confirmPayment(cnumber, cvv));
  }
}
