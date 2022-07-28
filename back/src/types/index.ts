import { Express, NextFunction, Request, Response } from 'express'

export type ServiceRouter = (app: Express) => void
export type RequestHandler = (req: Request, res: Response, next: NextFunction) => unknown