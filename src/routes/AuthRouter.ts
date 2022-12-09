import express, { Request, Response } from 'express';
import { AuthController } from '../controller/AuthController';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';
import { LogInfo } from '../utils/logger';

//* Router from express
let authRouter = express.Router();

//*Bcrypt for passwords
import bcrypt from 'bcrypt';

//* Body parser to read body from requests
import bodyParser from 'body-parser';

//* Middlewares
import { verifyToken } from '../middlewares/verifyToken.middleware';
let jsonParser = bodyParser.json();

authRouter
  .route('/register')
  .post(jsonParser, async (req: Request, res: Response) => {
    let { name, email, password, age } = req?.body;
    let hashedPassword = '';

    if (name && email && password && age) {
      //* Obtain the password in requeset and cypher
      hashedPassword = bcrypt.hashSync(password, 8);

      let newUser: IUser = {
        name,
        email,
        password: hashedPassword,
        age,
      };

      //* Controller Instance to execute method
      const controller: AuthController = new AuthController();
      //* Obtain Response
      const responseController: any = await controller.registerUser(newUser);

      //* Send to the client the response
      return res.status(200).send(responseController);
    } else {
      //* Send to the client the response which includes the JWT to authorize requests
      return res.status(400).send({
        message: '[Error User data missing]: No user can be registered',
      });
    }
  });

authRouter
  .route('/login')
  .post(jsonParser, async (req: Request, res: Response) => {
    let { email, password } = req?.body;

    if (email && password) {
      let auth: IAuth = { email, password };

      //* Controller Instance to execute method
      const controller: AuthController = new AuthController();
      //* Obtain Response
      const responseController: any = await controller.loginUser(auth);

      //* Send to the client the response which includes the JWT to authorize requests
      return res.status(200).send(responseController);
    } else {
      //* Send to the client the response which includes the JWT to authorize requests
      return res.status(400).send({
        message: '[Error User data missing]: No user can be registered',
      });
    }
  });

//* Route Protected by Verify Token Middleware
authRouter
  .route('/me')
  .get(verifyToken, async (req: Request, res: Response) => {
    //* Obtain the ID of user to check it's data
    let id: any = req?.query?.id;

    if (id) {
      //* Controller: AuthController
      const controller: AuthController = new AuthController();
      //* Obtain Response
      const responseController: any = await controller.userData(id);

      //* If user is authorized
      return res.status(200).send(responseController);
    } else {
      return res.status(401).send({
        message: 'You are not authorized to perform this action',
      });
    }
  });

export default authRouter;
