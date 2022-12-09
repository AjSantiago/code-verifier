import express, { Request, Response } from 'express';
import { UsersController } from '../controller/UsersController';
import { LogInfo } from '../utils/logger';

//* Router from express
let usersRouter = express.Router();

//* Body parser to read body from requests
import bodyParser from 'body-parser';
let jsonParser = bodyParser.json();

//* GET ->  http://localhost:8000/api/users?id=
usersRouter
  .route('/')
  .get(async (req: Request, res: Response) => {
    //* Obtain a Query Param (Id)
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);

    //* Controller Instance to execute method
    const controller: UsersController = new UsersController();
    //* Obtain Response
    const responseController: any = await controller.getUsers(id);

    //* Send to the client the response
    return res.status(200).send(responseController);
  })
  .delete(async (req: Request, res: Response) => {
    //* Obtain a Query Param (Id)
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);

    //* Controller Instance to execute method
    const controller: UsersController = new UsersController();
    //* Obtain Response
    const responseController: any = await controller.deleteUser(id);

    //* Send to the client the response
    return res.status(200).send(responseController);
  })
  .put(async (req: Request, res: Response) => {
    //* Obtain a Query Param (Id)
    let id: any = req?.query?.id;
    let name: any = req?.query?.name;
    let email: any = req?.query?.email;
    let age: any = req?.query?.age;
    LogInfo(`Query Param: ${id}, ${name}, ${email}, ${age}`);

    let user = {
      name: name,
      email: email,
      age: age,
    };

    //* Controller Instance to execute method
    const controller: UsersController = new UsersController();
    //* Obtain Response
    const responseController: any = await controller.updateUser(id, user);

    //* Send to the client the response
    return res.status(200).send(responseController);
  });

export default usersRouter;
