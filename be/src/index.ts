import dotenv from "dotenv";

dotenv.config({path: `.env.${process.env.NODE_ENV}`});
import config from "./config";
import {createServer} from "http";
import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import Db from "./db";
import api from './api';

process.on('uncaughtException', err => console.error((err && err.stack) ? err.stack : err))

Db.init().then(Db.migrate).then(async () => {
   const app = express();
   const httpServer = createServer(app);
   app.use(cors());
   app.use(compression());
   app.use(cookieParser());
   app.use('/',
      express.json({limit: config.requestBodyMaxSize}),
      express.urlencoded({limit: config.requestBodyMaxSize}),
      api);
   httpServer.listen({port: config.port}, () => console.log(`[http server] ready at http://localhost:${config.port}`));
});
