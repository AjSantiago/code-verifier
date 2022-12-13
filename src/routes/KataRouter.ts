import express, { Request, Response } from 'express';
import { KatasController } from '../controller/KatasController';
import { LogInfo } from '../utils/logger';
import { IKata, KataLevel } from '../domain/interfaces/IKata.interface';

//* Router from express
let katasRouter = express.Router();

//* Body parser to read body from requests
import bodyParser from 'body-parser';
let jsonParser = bodyParser.json();

//* Middlewares
import { verifyToken } from '../middlewares/verifyToken.middleware';

//* GET ->  http://localhost:8000/api/users?id=
katasRouter
  .route('/')
  .get(verifyToken, async (req: Request, res: Response) => {
    //* Obtain a Query Param (Id)
    let id: any = req?.query?.id;

    //* Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

    LogInfo(`Query Param: ${id}`);

    //* Controller Instance to execute method
    const controller: KatasController = new KatasController();
    //* Obtain Response
    const responseController: any = await controller.getKatas(page, limit, id);

    //* Send to the client the response
    return res.status(200).send(responseController);
  })
  .delete(verifyToken, async (req: Request, res: Response) => {
    //* Obtain a Query Param (Id)
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);

    //* Controller Instance to execute method
    const controller: KatasController = new KatasController();
    //* Obtain Response
    const responseController: any = await controller.deleteKata(id);

    //* Send to the client the response
    return res.status(200).send(responseController);
  })
  .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
    //* Obtain a Query Param (Id)
    let id: any = req?.query?.id;
    //* Read from body
    let name: string = req?.body?.name;
    let description: string = req?.body?.description || '';
    let level: KataLevel = req?.body?.level || KataLevel.BASIC;
    let intents: number = req?.body?.intents || 0;
    let stars: number = req?.body?.stars || 0;
    let creator: string = req?.body?.creator;
    let solution: string = req?.body?.solution || '';
    let participants: string[] = req?.body?.participants || [];

    if (
      name &&
      description &&
      level &&
      intents >= 0 &&
      stars >= 0 &&
      creator &&
      solution &&
      participants.length >= 0
    ) {
      let kata: IKata = {
        name,
        description,
        level,
        intents,
        stars,
        creator,
        solution,
        participants,
      };

      //* Controller Instance to execute method
      const controller: KatasController = new KatasController();
      //* Obtain Response
      const responseController: any = await controller.updateKata(id, kata);

      //* Send to the client the response
      return res.status(200).send(responseController);
    } else {
      //* Send to the client the response
      return res.status(400).send({
        message:
          '[Error]: Updatin Kata. You need to send all attrs of Kata to update it',
      });
    }
  })
  .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
    //* Read from body
    let name: string = req?.body?.name;
    let description: string = req?.body?.description || '';
    let level: KataLevel = req?.body?.level || KataLevel.BASIC;
    let intents: number = req?.body?.intents || 0;
    let stars: number = req?.body?.stars || 0;
    let creator: string = req?.body?.creator;
    let solution: string = req?.body?.solution || '';
    let participants: string[] = req?.body?.participants || [];

    if (
      name &&
      description &&
      level &&
      intents >= 0 &&
      stars >= 0 &&
      creator &&
      solution &&
      participants.length >= 0
    ) {
      let kata: IKata = {
        name,
        description,
        level,
        intents,
        stars,
        creator,
        solution,
        participants,
      };

      //* Controller Instance to execute method
      const controller: KatasController = new KatasController();
      //* Obtain Response
      const responseController: any = await controller.createKata(kata);

      //* Send to the client the response
      return res.status(201).send(responseController);
    } else {
      //* Send to the client the response
      return res.status(400).send({
        message:
          '[Error]: Creating Kata. You need to send all attrs of Kata to update it',
      });
    }
  });

export default katasRouter;
