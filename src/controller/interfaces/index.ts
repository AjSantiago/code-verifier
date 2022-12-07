import { BasicResponse } from '../types';
import { BasicDateResponse } from '../types';

export interface iHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface iGoodByeController {
  getMessage(name?: string, date?: Date): Promise<BasicDateResponse>;
}

export interface iUsersController {
  //* Read All Users from database || Get User by Id
  getUsers(id?: string): Promise<any>;
  //* Delete User by Id from database
  deleteUser(id?: string): Promise<any>;
  //* Create new user
  createUser(user: any): Promise<any>;
  //* Update user
  updateUser(id: string, user: any): Promise<any>;
}
