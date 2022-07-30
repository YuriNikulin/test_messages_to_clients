import { Response } from "express";
import { AuthService } from "../services/AuthService";
import { HTTP_STATUSES, RequestWithUserHandler, UserModel } from "../types";

const throwError = (res: Response) => {
    return res.status(HTTP_STATUSES.ERROR_AUTH).send({
        message: 'Необходимо авторизоваться'
    })
}

export function withUser({ authRequired } = { authRequired: true }) {
    return function (this: any, target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const origFunc = descriptor.value
        descriptor.value = async (...[req, res]: Parameters<RequestWithUserHandler>) => {
            const token = req.header('Authorization')
            if (!token && authRequired) {
                return throwError(res)
            }

            if (token) {
                const result = await AuthService.parseUserToken(token)
                if (!result && authRequired) {
                    return throwError(res)
                }

                req.user = result as UserModel
            }
            
            origFunc.apply(this, [req, res])
        }
  }
}