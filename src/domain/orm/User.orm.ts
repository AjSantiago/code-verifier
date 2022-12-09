import { userEntity } from '../entities/User.entity';
import { LogError } from '../../utils/logger';
import { IUser } from '../interfaces/IUser.interface';
import { IAuth } from '../interfaces/IAuth.interface';

//* Bcrypt for passwords
import bcrypt from 'bcrypt';

//* Environment variables
import dotenv from 'dotenv';
//* Configuration of environment
dotenv.config();

//* JWT
import jwt from 'jsonwebtoken';
//* Obtain secret key to generate JWT
const secret = process.env.SECRETKEY;

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

/**
 * Method to register a User
 */
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    //* Create /Insert new User
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`);
  }
};

export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    let userFound: IUser | undefined = undefined;
    let token = undefined;

    //* Find if user exists by unique email
    await userModel
      .findOne({ email: auth.email })
      .then((user: IUser) => {
        userFound = user;
      })
      .catch((error) => {
        LogError(`[ORM Error Authentication]: User not found`);
        throw new Error(`[ORM Error Authentication]: User not found ${error}`);
      });

    //* User Bcrypt to compare passwords & check if password is valid
    let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

    if (!validPassword) {
      LogError(`[ORM Error Authentication]: User not found`);
      throw new Error(`[ORM Error Authentication]: User not found`);
    }

    //* Create JWT
    token = jwt.sign({ email: userFound!.email }, secret, {
      expiresIn: '2h',
    });

    return {
      user: userFound,
      token,
    };
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`);
  }
};

//TODO: Logout user
export const logoutUser = async (): Promise<any | undefined> => {};
