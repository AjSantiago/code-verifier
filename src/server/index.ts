import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { LogError, LogSuccess } from '../utils/logger';

//* Swagger
import swaggerUi from 'swagger-ui-express';

//* Security
import cors from 'cors';
import helmet from 'helmet';

//TODO: HTTPS

//* Root Router
import rootRouter from '../routes';

//* Create Express App
const server: Express = express();

//* Swagger Config and Route
server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
      explorer: true,
    },
  })
);

//* Define SERVER to use '/api' and use rootRouter from 'index.ts' in routes
//* http://localhost:8000/api/...
server.use('/api', rootRouter);

//* Static server
server.use(express.static('public'));

//* Mongoose connection
mongoose
  .connect('mongodb://127.0.0.1:27017/codeverifier')
  .then(() => {
    LogSuccess(`BD is now connected`);
  })
  .catch((err) => {
    LogError(`Error: ${err}`);
  });

//* Security Config
server.use(helmet());
server.use(cors());

//* Content Type Config
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));

//* Redirection Config
server.get('/', (req: Request, res: Response) => {
  res.redirect('/api');
});

export default server;
