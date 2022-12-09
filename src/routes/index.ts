/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express';
import helloRouter from './HelloRouter';
import goodByeRouter from './GoodByeRouter';
import { LogInfo } from '../utils/logger';
import usersRouter from './UsersRouter';
import authRouter from './AuthRouter';

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
server.use('/goodbye', goodByeRouter); // http://localhost:8000/api/goodbye
server.use('/users', usersRouter); // http://localhost:8000/api/users
//* Authentication route
server.use('/auth', authRouter); // http://localhost:8000/api/auth

export default server;
