import { BasicResponse } from '../types';
import { BasicDateResponse } from '../types';
import { IUser } from '../../domain/interfaces/IUser.interface';
import { IKata } from '../../domain/interfaces/IKata.interface';

export interface iHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface iGoodByeController {
  getMessage(name?: string, date?: Date): Promise<BasicDateResponse>;
}

export interface iUsersController {
  //* Read All Users from database || Get User by Id
  getUsers(page: number, limit: number, id?: string): Promise<any>;
  //* Get Katas of User
  getKatas(page: number, limit: number, id?: string): Promise<any>;
  //* Delete User by Id from database
  deleteUser(id?: string): Promise<any>;
  //* Update user
  updateUser(id: string, user: any): Promise<any>;
}

export interface iAuthController {
  //* Register users
  registerUser(user: IUser): Promise<any>;
  //* Login user
  loginUser(auth: any): Promise<any>;
}

export interface iKataController {
  //* Read All Kata from database || Get Kata by Id
  getKatas(page: number, limit: number, id?: string): Promise<any>;
  //* Create New Kata
  createKata(kata: IKata): Promise<any>;
  //* Delete Kata by Id from database
  deleteKata(id?: string): Promise<any>;
  //* Update Kata
  updateKata(id: string, kata: IKata): Promise<any>;
  //* Upload File to Kata
  uploadKataFile(): Promise<any>;
}
