import express, { Request, response, Response } from 'express';
import { HelloController } from '@/controller/HelloController';
import { LogInfo } from '../utils/logger';

//* Router from express
let helloRouter = express.Router();

//* GET ->  http://localhost:8000/api/hello?name=Santi/
helloRouter.route('/').get(async (req: Request, res: Response) => {
  //* Obtain a Query Param
  let name: any = req?.query?.name;
  LogInfo(`Query Param: ${name}`);

  //* Controller Instance to execute method
  const controller: HelloController = new HelloController();
  controller.getMessage();
  //* Obtain Response
  const reponse = await controller.getMessage(name);
  //* Send to the client the response
  return res.send(response);
});

export default helloRouter;
