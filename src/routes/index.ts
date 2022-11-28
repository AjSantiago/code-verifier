/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, response, Response } from 'express';
import helloRouter from './HelloRouter';
import { LogInfo } from '@/utils/logger';

//* Server instance
let server = express();

//* Router instance
let rootRouter = express.Router();

//* Activate for requests for http://localhost:8000/api
//* GET: http://localhost:8000/api/
rootRouter.get('/', (req: Request, res: Response) => {
  LogInfo('GET: http://localhost:8000/api/');
  res.send('Welcome to API Restfull: Express + TS + Swagger + Mongoose');
});

//* Redirections to Routers & Controllers
server.use('/', rootRouter); // http://localhost:8000/api
server.use('/hello', helloRouter); // http://localhost:8000/api/hello

export default server;
