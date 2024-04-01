import { Request, Response, NextFunction } from "express";

export const healthHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send({ data: null, msg: "service is health" });
};

export default healthHandler;
