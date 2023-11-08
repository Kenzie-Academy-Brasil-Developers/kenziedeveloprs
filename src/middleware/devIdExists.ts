import { client } from "../database"
import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"
import { DevelopersResult } from "../interfaces";

export const developerIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const queryResult: DevelopersResult = await client.query(
    'SELECT * FROM "developerInfos" WHERE "developerId" = $1;',
    [req.params.id]
  );

  if (queryResult.rowCount) {
    throw new AppError("Developer not found.", 409);
  }
  console.log("oi")
  return next();
}

  




