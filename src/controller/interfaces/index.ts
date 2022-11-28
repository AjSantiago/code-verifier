import { BasicResponse } from '../types';

export interface iHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}
