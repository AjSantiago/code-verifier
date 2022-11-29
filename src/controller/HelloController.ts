import { iHelloController } from './interfaces';
import { BasicResponse } from './types';
import { LogSuccess } from '../utils/logger';

export class HelloController implements iHelloController {
  public async getMessage(name?: string | undefined): Promise<BasicResponse> {
    LogSuccess('[/api/hello] Get Request');

    return {
      message: `Hello, ${name || 'World!'}`,
    };
  }
}
