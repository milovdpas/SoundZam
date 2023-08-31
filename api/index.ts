import express, {Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from "express-fileupload";
import methodOverride from 'method-override';
import RecognizeRouter from "./routes/RecognizeRouter";
import errorHandler from "./app/middlewares/ErrorHandlingMiddleware";
import notFound from "./app/middlewares/NotFoundMiddleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(fileUpload({
    useTempFiles : true,
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(methodOverride())

app.use("/api/recognize", RecognizeRouter);

// Fallback handlers
app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
