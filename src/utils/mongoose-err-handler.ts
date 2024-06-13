import { Response } from 'express'
import { errorResponse } from './response'

function isValidationErr(err: Error): boolean {
  return err.message === "Validation Error"
}

function isDuplicateErr(err: any): boolean {
  return (err.name ? err.name == "MongoError" : false) && (err.code ? err.code == 1100 : false)
}

function isMongoNetworkErr(err: Error): boolean {
  return err.name === 'MongoNetworkError'
}

function isSyntaxErr(err: Error): boolean {
  return err.name === "SyntaxError"
}

function isAuthErr(err: Error): boolean {
  return err.name === "AuthorizationError"
}

export default function mongooseErrHandler(res: Response, err: any): Response {
  const errMap: { [key: string]: [boolean, number] } = {
    validationErr: [isValidationErr(err), 400],
    duplicateErr: [isDuplicateErr(err), 409],
    mongoNetworkErr: [isMongoNetworkErr(err), 500],
    syntaxErr: [isSyntaxErr(err), 400],
    authErr: [isAuthErr(err), 403]
  }
  const errFound = Object.entries(errMap).find(eachErr => eachErr[1][0])
  if (!errFound) {
    // Unknown error
    return errorResponse(res, 500, err)
  }

  return errorResponse(res, errFound[1][1], err)
}