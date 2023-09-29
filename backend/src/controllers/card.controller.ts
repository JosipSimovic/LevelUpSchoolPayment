import { Request, Response, NextFunction } from "express";
import { CardService } from "../services/card.service";

export class CardController {
  constructor(private readonly cardService: CardService) {}

  async confirmPayment(req: Request, res: Response, next: NextFunction) {
    const { cnumber, cvv }: { cnumber: number; cvv: number } = req.body;

    res.status(200).json({
      message: `Payment succesfull for card '${cnumber}' with CVV '${cvv}'`,
    });
  }
}
