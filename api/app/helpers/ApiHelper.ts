import {Response} from 'express'
import {ValidationError} from "express-validator/src/base";

export default class ApiHelper {
    static Response(res: Response, data: any) {
        data.success = true;
        return res.status(200).json(data);
    }

    static ErrorResponse(res: Response, status: number = 500, errorCode: string = 'ERROR', data: any = {}) {
        data.success = false;
        data.errorCode = errorCode;
        return res.status(status).json(data);
    }

    static ValidationResponse(res: Response, errors: Array<ValidationError> = []) {
        console.log('here2');
        console.log(errors);
        return res.status(400).json({
            success: false,
            errorCode: 'VALIDATION_EXCEPTION',
            errors: errors
        });
    }
}
