import express, { Request, Response } from 'express';
import { UsersController } from '../controller/UsersController';
import { LogInfo } from '../utils/logger';

//* Router from express
let usersRouter = express.Router();

//* Body parser to read body from requests
import bodyParser from 'body-parser';
let jsonParser = bodyParser.json();

//* Middlewares
import { verifyToken } from '../middlewares/verifyToken.middleware';

//* GET ->  http://localhost:8000/api/users?id=
usersRouter
  .route('/')
  .get(verifyToken, async (req: Request, res: Response) => {
    //* Obtain a Query Param (Id)
    let id: any = req?.query?.id;

    //* Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

    LogInfo(`Query Param: ${id}`);

    //* Controller Instance to execute method
    const controller: UsersController = new UsersController();
    //* Obtain Response
    const responseController: any = await controller.getUsers(page, limit, id);

    //* Send to the client the response
    return res.status(200).send(responseController);
  })
  .delete(verifyToken, async (req: Request, res: Response) => {
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
  .put(verifyToken, async (req: Request, res: Response) => {
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
