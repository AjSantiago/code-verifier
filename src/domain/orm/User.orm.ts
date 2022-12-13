import mongoose from 'mongoose';
import { userEntity } from '../entities/User.entity';
import { LogError } from '../../utils/logger';
import { IUser } from '../interfaces/IUser.interface';
import { IAuth } from '../interfaces/IAuth.interface';
import { UserResponse } from '../types/UsersResponse.type';
import { kataEntity } from '../entities/Kata.entity';

//* Bcrypt for passwords
import bcrypt from 'bcrypt';

//* Environment variables
import dotenv from 'dotenv';
//* Configuration of environment
dotenv.config();

//* JWT
import jwt from 'jsonwebtoken';
import { IKata } from '../interfaces/IKata.interface';
//* Obtain secret key to generate JWT
const secret = process.env.SECRETKEY;

//* CRUD

/**
 * Method to obtain all Users from Collection 'Users' in Mongo Server
 */
export const getAllUsers = async (
  page: number,
  limit: number
): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    let response: any = {};

    //* Search all users using pagination
    await userModel
      .find({ isDelete: false })
      .select('name email age katas')
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((users: IUser[]) => {
        response.users = users;
      });

    //* Count total documents in collection 'Users'
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
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
    return await userModel.findById(id).select('name email age katas');
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

/**
 * Method to obtain all Katas from a User by Id
 */
export const getKatasFromUser = async (
  page: number,
  limit: number,
  id: string
): Promise<any[] | undefined> => {
  try {
    let userModel = userEntity();
    let katasModel = kataEntity();
    let katasFound: IKata[] = [];

    let response: any = { katas: [] };

    //* Search all katas from a user
    await userModel
      .findById(id)
      .then(async (user: IUser) => {
        response.user = user.email;

        //* Create types to search
        let objectIds: mongoose.Types.ObjectId[] = [];
        user.katas.forEach((kataID: string) => {
          let objectId = new mongoose.Types.ObjectId(kataID);
          objectIds.push(objectId);
        });

        await katasModel
          .find({ _id: { $in: objectIds } })
          .then((katas: IKata[]) => {
            katasFound = katas;
          });
      })
      .catch((error) => {
        LogError(`[ORM ERROR]: Obtaining Katas from a User by Id: ${error}`);
      });

    response.katas = katasFound;

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Katas from a User by Id: ${error}`);
  }
};
