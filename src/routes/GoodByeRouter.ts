import express, { Request, Response } from 'express';
import { GoodByeController } from '../controller/GoodByeController';
import { LogInfo } from '../utils/logger';

//* Router from express
let goodByeRouter = express.Router();

//* GET ->  http://localhost:8000/api/goodbye?name=Santi/
goodByeRouter.route('/').get(async (req: Request, res: Response) => {
  //* Obtain a Query Param
  let name: any = req?.query?.name;
  LogInfo(`Query Param: ${name}`);

  //* Controller Instance to execute method
  const controller: GoodByeController = new GoodByeController();
  //* Obtain Response
  const response = await controller.getMessage();
  //* Send to the client the response
  return res.send(response);
});

export default goodByeRouter;
