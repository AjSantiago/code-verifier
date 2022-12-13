import { kataEntity } from '../entities/Kata.entity';
import { LogError } from '../../utils/logger';
import { IKata } from '../interfaces/IKata.interface';

//* Environment variables
import dotenv from 'dotenv';
//* Configuration of environment
dotenv.config();

//* CRUD

/**
 * Method to obtain all Katas from Collection 'Katas' in Mongo Server
 */
export const getAllKatas = async (
  page: number,
  limit: number
): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();

    let response: any = {};

    //* Search all katas using pagination
    await kataModel
      .find({ isDelete: false })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        response.katas = katas;
      });

    //* Count total documents in collection 'Katas'
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Katas: ${error}`);
  }
};

/**
 * Method to obtain one Kata by Id
 */
export const getKataById = async (id: string): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();

    //* Search Kata by Id
    return await kataModel.findById(id);
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Kata by Id: ${error}`);
  }
};

/**
 * Method to delete a Kata by Id
 */
export const deleteKataById = async (id: string): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();

    //* Delete Kata by Id
    return await kataModel.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting Kata by Id: ${error}`);
  }
};

/**
 * Method to create a new Kata
 */
export const createKata = async (kata: IKata): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();

    //* Create /Insert new Kata
    return await kataModel.create(kata);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating Kata: ${error}`);
  }
};

/**
 * Method to update Kata by Id
 */
export const updateKataById = async (
  id: string,
  kata: IKata
): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();

    //* Update Kata by Id
    return await kataModel.findByIdAndUpdate(id, kata);
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Kata  ${id}: ${error}`);
  }
};
