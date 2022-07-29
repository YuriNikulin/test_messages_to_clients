import { Express, NextFunction, Request, Response } from 'express'

export type Router = (app: Express) => void
export type RequestHandler = (req: Request, res: Response, next: NextFunction) => unknown

export enum HTTP_STATUSES {
    SUCCESS = 200,
    ERROR_REQUEST = 400,
    ERROR_AUTH = 401,
    ERROR_NOT_FOUND = 404,
    ERROR_SERVER = 500
}
