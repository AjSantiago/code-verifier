import { iGoodByeController } from './interfaces';
import { BasicDateResponse } from './types';
import { LogSuccess } from '../utils/logger';

export class GoodByeController implements iGoodByeController {
  public async getMessage(
    name?: string | undefined,
    date?: Date | undefined
  ): Promise<BasicDateResponse> {
    LogSuccess('[/api/goodbye] Get Request');

    return {
      message: `GoodBye, ${name || 'World!'}`,
      date: new Date(),
    };
  }
}
