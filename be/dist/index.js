import express from "express";
import cors from "cors";
import config from "./config.js";
import router from "./router.js";
import errorHandler from './middleware/error.handler.js';
import { log } from './lib.js';
var app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(router);
var PORT = config.APP_PORT;
app.listen(PORT, function () {
    log("App is running on port ".concat(PORT));
});
