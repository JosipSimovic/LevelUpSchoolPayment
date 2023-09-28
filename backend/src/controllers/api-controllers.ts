import { Request, Response, NextFunction } from "express";

const processCardDummy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Await 2 seconds to simulate processing of card
  await new Promise((res) => setTimeout(res, 2000));
  res.status(200);
  res.json({
    message: "Card succesfully processed.",
  });
};

module.exports = {
  processCardDummy,
};
