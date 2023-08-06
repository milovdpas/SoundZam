import {Request, Response} from "express";
import ApiHelper from "../helpers/ApiHelper";

export default function notFound(req: Request, res: Response) {
    return ApiHelper.ErrorResponse(res, 404, 'NOT_FOUND', {message: 'API endpoint does not exist'});
}
