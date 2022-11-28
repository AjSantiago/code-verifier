import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

//* Configuration the .env file
dotenv.config();

//* Create Express App
const app: Express = express();
const port = process.env.PORT || 8000;

//* Define the first Route of App
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to API Restfull: Express + TS + Swagger + Mongoose');
});

app.get('/hello', (req: Request, res: Response) => {
  res.send('Welcome to Get Route: Hello!');
});

//* Execute the App and Listen Request to Port
app.listen(port, () => {
  console.log(`Express Server: Running at http://localhost:${port}`);
});
