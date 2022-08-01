import { Response } from "express";
import { ERROR_USER_NOT_FOUND } from "./constants";
import { HTTP_STATUSES } from "./types";

export const throwNoUserError = (res: Response) => {
    return res.status(HTTP_STATUSES.ERROR_NOT_FOUND).send({
        message: ERROR_USER_NOT_FOUND
    })
}

export const returnMessage = (message: string) => ({ message })
export const getTextRawLength = (text: string) => `${text}`.replaceAll(' ', '').length