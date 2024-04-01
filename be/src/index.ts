import express from "express";
import cors from "cors";
import config from "./config.js";
import router from "./router.js";
import errorHandler from '@middleware/error.handler.js';
import { log } from '@/lib.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(router);

const PORT = config.APP_PORT;
app.listen(PORT, () => {
  log(`App is running on port ${PORT}`);
});
