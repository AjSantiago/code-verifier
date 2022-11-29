import { Get, Query, Route, Tags } from 'tsoa';
import { iGoodByeController } from './interfaces';
import { BasicDateResponse } from './types';
import { LogSuccess } from '../utils/logger';

@Route('/api/goodbye')
@Tags('GoodByeController')
export class GoodByeController implements iGoodByeController {
  /**
   * Endpointto retreive a Message 'GoodBye {name}, date' in JSON
   * @param {string|undefined} name
   * @param {Date} date
   * @returns {BasicDateResponse} Promise of BasicDateResponse
   */
  @Get('/')
  public async getMessage(
    @Query() name?: string | undefined,
    date?: Date | undefined
  ): Promise<BasicDateResponse> {
    LogSuccess('[/api/goodbye] Get Request');

    return {
      message: `GoodBye, ${name || 'World!'}`,
      date: new Date(),
    };
  }
}
