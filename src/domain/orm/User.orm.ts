import { userEntity } from '../entities/User.entity';
import { LogSuccess, LogError } from '../../utils/logger';

//* CRUD

/**
 * Method to obtain all Users from Collection 'Users' in Mongo Server
 */
export const getAllUsers = async (): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    //* Search all users
    return await userModel.find({ isDelete: false });
  } catch (error) {
    LogError(`[ORM ERROR]: Gettint All Users: ${error}`);
  }
};

//TODO:  - Get User By Id
//TODO:  - Get User By Email
//TODO:  - Create New User
//TODO:  - Update User By Id
//TODO:  - Delete User By Id
