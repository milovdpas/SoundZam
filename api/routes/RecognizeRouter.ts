import express from "express";
import {detectSongWithAudd, validate} from "../app/controllers/RecognizeController";

const router = express.Router();

router.post("/detect", validate('detectAudd'), detectSongWithAudd);

export default router;
