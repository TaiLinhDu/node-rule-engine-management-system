import { Request, Response, NextFunction } from "express";
import { sendInternalError, sendNotFound } from "../helpers/response.helper";

/**
 * Wrapper for the error handler
 * @param func
 */
export const wrapAsync = (func: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(next);
    }
};


/**
 * Global error handler
 * @param error
 * @param request
 * @param response
 * @param next
 */

export const globalErrorHandler = (error: Error, request: Request, response: Response) => {
    sendInternalError(response, error);
};


export const urlNotFound = async (req: Request, res: Response) => {
    sendNotFound(res, 'Url is invalid')
};
