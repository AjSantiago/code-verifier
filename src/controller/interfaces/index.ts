import { BasicResponse } from '../types';
import { BasicDateResponse } from '../types';

export interface iHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface iGoodByeController {
  getMessage(name?: string, date?: Date): Promise<BasicDateResponse>;
}
