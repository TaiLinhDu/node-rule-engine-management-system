import { Request, Response, NextFunction } from "express";


export const timelog = (req: Request, res: Response, next: NextFunction) => {
    if(process.env.NODE_EVN != 'test') {
        console.log('Log: ' + new Date().toLocaleString());
    }
    next();
};
