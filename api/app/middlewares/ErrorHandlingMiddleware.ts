import {Request, Response, NextFunction} from "express";
import ApiHelper from "../helpers/ApiHelper";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(JSON.stringify(err));
    console.log(res.headersSent);
    if (res.headersSent) {
        return next(err);
    }

    const errorCode = err.name ? err.name : err.toString();
    const responseCode = 500;

    return ApiHelper.ErrorResponse(res, responseCode, errorCode, {message: err.message});
}
