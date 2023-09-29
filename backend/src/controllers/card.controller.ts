import { Request, Response, NextFunction } from "express";
import { CardService } from "../services/card.service";

export class CardController {
  constructor(private readonly cardService: CardService) {}

  confirmPayment = async (req: Request, res: Response, next: NextFunction) => {
    const { cnumber, cvv }: { cnumber: number; cvv: number } = req.body;

    // Await 2 seconds to simulate card processing
    await new Promise((r) => setTimeout(r, 2000));

    res.status(200).json({
      message: `Payment succesfull for card '${cnumber}' with CVV '${cvv}'`,
    });
  };
}
