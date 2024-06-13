import { Response } from 'express'

function msgIsString(msg: string | object): msg is string {
  return typeof msg === "string"
}

export function stdResponse(res: Response, status: number, msg: string | object): Response {
  if (msgIsString(msg)) {
    return res.status(status).json({ message: msg })
  }
  return res.status(200).json(msg)
}

export function errorResponse(res: Response, status: number, err: any): Response {
  if (err instanceof Error) {
    return res.status(status).json({ error: err.message })
  }
  return res.status(status).json({ error: err })
}