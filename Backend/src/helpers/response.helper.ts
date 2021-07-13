import { Response } from "express";

/**
 * @description 200 OK
 * @param {Response} res
 * @param {*} docs
 * @param {string} [message] optional
 */
export const sendSuccess = (res: Response, docs: any, message?: string) => {
    res.status(200).send({
        data: {
            status: 'success',
            docs: docs,
            message: message
        }
    });
};

/**
 * @description 201 CREATED
 * @param {Response} res
 * @param {*} docs
 */

export const sendCreated = (res: Response, docs: any) => {
    res.status(201).send({
        data: {
            status: 'success',
            docs: docs
        }
    });
};


/**
 * @description 500 INTERNAL SERVER ERROR
 * @param {Response} res
 * @param {Error} error
 */

export const sendInternalError = (res: Response, error: Error) => {
    res.status(500).send({
        data:  {
            status: 'error',
            message: error.message
        }
    });
};


/**
 * @description 404
 * @param {Response} res
 * @param {string}  message
 */

export const sendNotFound = (res: Response, message: String) => {
    res.status(404).send({
        data:  {
            status: 'error',
            message: message
        }
    });
};
