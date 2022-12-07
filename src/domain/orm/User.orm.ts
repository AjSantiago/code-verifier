import { userEntity } from '../entities/User.entity';
import { LogError } from '../../utils/logger';

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
    LogError(`[ORM ERROR]: Getting All Users: ${error}`);
  }
};

/**
 * Method to obtain one User by Id
 */
export const getUserById = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    //* Search User by Id
    return await userModel.findById(id);
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User by Id: ${error}`);
  }
};

/**
 * Method to delete a User by Id
 */
export const deleteUserById = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    //* Delete User by Id
    return await userModel.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting User by Id: ${error}`);
  }
};

/**
 * Method to create a new User
 */
export const createUser = async (user: any): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    //* Create /Insert new User
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`);
  }
};

/**
 * Method to update User by Id
 */
export const updateUserById = async (
  id: string,
  user: any
): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    //* Update User by Id
    return await userModel.findByIdAndUpdate(id, user);
  } catch (error) {
    LogError(`[ORM ERROR]: Updatin User  ${id}: ${error}`);
  }
};

//TODO:  - Get User By Email
