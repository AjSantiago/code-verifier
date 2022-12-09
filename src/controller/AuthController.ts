import { Query, Route, Tags, Get, Delete, Post, Put } from 'tsoa';
import { iAuthController } from './interfaces';
import { LogSuccess, LogWarning } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';
import { AuthResponse, ErrorResponse } from './types';

//* ORM - Users Collection
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
} from '../domain/orm/User.orm';

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements iAuthController {
  @Post('/register')
  public async registerUser(user: IUser): Promise<any> {
    let response: any = '';

    if (user) {
      await registerUser(user).then((r) => {
        LogSuccess(`[/api/auth/register] Created User ${user.email}`);
        response = {
          message: `User register successfully: ${user.name}`,
        };
      });
    } else {
      LogWarning('[/api/auth/register] Register needs User entity');
      response = {
        message:
          'User not registered: Please, provide a User entity to create one',
      };
    }

    return response;
  }

  @Post('/login')
  public async loginUser(auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined;

    if (auth) {
      LogSuccess(`[/api/auth/login] Logged In User: ${auth.email}`);
      let data = await loginUser(auth);
      response = {
        message: `Welcome ${data.user.name}`,
        token: data.token, //* JWT generated for logged in user
      };
    } else {
      LogWarning(
        '[/api/auth/login] Register needs Auth entity (email & password)'
      );
      response = {
        error: '[Auth Error]: Email & Password are needed',
        message: 'Please, provide a email & password to login',
      };
    }

    return response;
  }

  /**
   * Endpoint to retreive the User in the Colecction 'Users' of DB
   * Middleware: Validate JWT
   * In headers you must add the x-access-token with a valid JWT
   * @param {string} id Id of user to retreive (optional)
   * @returns  All user o user found by Id
   */
  @Get('/me')
  public async userData(@Query() id: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/auth/login] Get User Data By Id: ${id}`);
      response = await getUserById(id);
      //* Remove the password
      response.password = '';
    }

    return response;
  }

  @Post('/logout')
  public async logoutUser(): Promise<any> {
    let response: any = '';

    // TODO: Close session of user
    throw new Error('Method not implemented.');
  }
}
