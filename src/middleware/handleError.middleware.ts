import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"

const handleError = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  console.error(err)
  return res.status(500).json({ error: "Internal server error." })
};

export { handleError }