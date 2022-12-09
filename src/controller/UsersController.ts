import { Query, Route, Tags, Get, Delete, Post, Put } from 'tsoa';
import { iUsersController } from './interfaces';
import { LogSuccess, LogWarning } from '../utils/logger';

//* ORM - Users Collection
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUserById,
} from '../domain/orm/User.orm';

@Route('/api/users')
@Tags('UsersController')
export class UsersController implements iUsersController {
  /**
   * Endpoint to retreive the Users in the Colecction 'Users' of DB
   * @param {string} id Id of user to retreive (optional)
   * @returns  All user o user found by Id
   */
  @Get('/')
  public async getUsers(@Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/users] Get User By Id: ${id}`);
      response = await getUserById(id);
      //* Remove the password
      response.password = '';
    } else {
      LogSuccess('[/api/users] Get All Users Request');
      response = await getAllUsers();
      // TODO: Remove passwords from response
    }

    return response;
  }

  /**
   * Endpoint to delete the User by Id in the Colecction 'Users' of DB
   * @param {string} id Id of user to delete (optional)
   * @returns  Message informing if deletion was correct
   */
  @Delete('/')
  public async deleteUser(@Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/users] Delete User By Id: ${id}`);

      await deleteUserById(id).then((r) => {
        response = {
          message: `User with ID ${id} deleted successfully`,
        };
      });
    } else {
      LogWarning('[/api/users] Delete User Request without ID');

      response = {
        message: 'Please, provide an ID to remove from Database',
      };
    }

    return response;
  }

  /**
   * Endpoint to update the User by Id in the Colecction 'Users' of DB
   * @param {string} id
   * @param {any} user
   * @returns
   */
  @Put('/')
  public async updateUser(@Query() id: string, user: any): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/users] Update User By Id: ${id}`);

      await updateUserById(id, user).then((r) => {
        response = {
          message: `User with ID ${id} updated successfully`,
        };
      });
    } else {
      LogWarning('[/api/users] Update User Request without ID');

      response = {
        message: 'Please, provide an ID to update an existing user',
      };
    }

    return response;
  }
}
