import {Request, Response} from 'express';
import {check, ValidationChain, validationResult} from "express-validator";
import ApiHelper from '../helpers/ApiHelper'
import {Options, PythonShell} from 'python-shell';
import querystring from 'querystring';
import axios from "axios";
import FormData from 'form-data';
import * as fs from "fs";

export const validate = (method: string): ValidationChain[] => {
    const allowedMimetypes = ['mp3'];
    switch (method) {
        case "detect":
            return [
                check('limit')
                    .notEmpty().withMessage('Limit is required')
                    .custom(value => {
                        if (value > 0 && value <= 10) {
                            return Promise.resolve();
                        }
                        return Promise.reject();
                    }).withMessage("Limit between 1 and 10"),

            ]
        case 'detectAudd': {
            return [
                check('file').custom((file, {req}) => {
                    console.log(req.files.file);
                    const fileName: string = req.files.file.name;
                    console.log(fileName);
                    const mimetype: string = fileName.substring(fileName.lastIndexOf(".") + 1);
                    console.log(mimetype);
                    console.log(allowedMimetypes);
                    return allowedMimetypes.includes(mimetype);
                }).withMessage("Invalid file extension. Only mp3 is allowed")
            ]
        }
        default: {
            throw new Error(`validation method '${method}' not found`);
        }
    }
}

export const detectSongWithAcoustId = async (req: Request, res: Response) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return ApiHelper.ValidationResponse(res, errors.array());
    }
    const basePath = process.cwd();
    const apiKey = process.env.ACOUSTID_API_KEY;
    const mp3FilePath = `${basePath}\\storage\\audio_files\\music.mp3`;
    const options: Options = {
        pythonPath: `${basePath}\\app\\scripts\\python3`,
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: `${basePath}\\app\\scripts`,
        args: [mp3FilePath]
    };
    const response: any = await PythonShell.run('get_fingerprint.py', options);
    const data = JSON.parse(response);
    const params = {
        'client': apiKey, 'duration': data.duration, 'fingerprint': data.fingerprint, 'meta': 'recordings'
    }
    const url = `https://api.acoustid.org/v2/lookup?${querystring.encode(params)}`;
    const apiResponse: any = await axios.get(url);
    if (apiResponse.status === 200)
        return ApiHelper.Response(res, {data: apiResponse.data.results});
    else
        return ApiHelper.ErrorResponse(res, 404, 'SONG_NOT_FOUND');
};

export const detectSongWithAudd = async (req: any, res: Response) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('files: ' + req.files);
        return ApiHelper.ValidationResponse(res, errors.array());
    }
    const params = {
        'api_token': process.env.AUDD_API_KEY,
    }
    console.log(params);
    console.log(req.files.file);
    const formData = new FormData();
    formData.append("return", 'spotify');
    formData.append("file", fs.createReadStream(req.files.file.tempFilePath));

    const url = `https://api.audd.io/recognize?${querystring.encode(params)}`;
    const apiResponse: any = await axios.post(url, formData);
    console.log(apiResponse.data);
    if (apiResponse.data.status === 'success') {
        const data: any = apiResponse.data.result;
        return ApiHelper.Response(res, {
            artist: data.artist,
            title: data.title,
            image: data.spotify.album.images[0].url,
            url: data.spotify.external_urls.spotify
        });
    }
    else if(apiResponse.data.status === 'error' && apiResponse.data.error.error_code === 900)
        return ApiHelper.ErrorResponse(res, 400, 'API_TOKEN_EXPIRED');
    else
        return ApiHelper.ErrorResponse(res, 400, 'SONG_NOT_FOUND');
};
