import { connection, ConnectionStates } from "mongoose"
import { Request, Response, NextFunction } from "express"
import { errorResponse } from "../utils/response"

export default function checkConn(req: Request, res: Response, next: NextFunction) {
  if (connection.readyState == ConnectionStates.connected) {
    return next()
  }
  return errorResponse(res, 500, "cannot connect to database")
}