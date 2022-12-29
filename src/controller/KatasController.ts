import { Query, Route, Tags, Get, Delete, Post, Put } from 'tsoa';
import { iKataController } from './interfaces/index';
import { LogSuccess, LogWarning } from '../utils/logger';

//* ORM - Katas Collection
import {
  getAllKatas,
  getKataById,
  createKata,
  deleteKataById,
  updateKataById,
} from '../domain/orm/Kata.orm';
import { IKata } from '@/domain/interfaces/IKata.interface';

@Route('/api/katas')
@Tags('KatasController')
export class KatasController implements iKataController {
  /**
   * Endpoint to retreive the Katas in the Colecction 'Katas' of DB
   * @param {string} id Id of kata to retreive (optional)
   * @returns  All katas o kata found by Id
   */
  @Get('/')
  public async getKatas(
    @Query() page: number,
    @Query() limit: number,
    @Query() id?: string
  ): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/katas] Get Kata By Id: ${id}`);
      response = await getKataById(id);
    } else {
      LogSuccess('[/api/katas] Get All Katas Request');
      response = await getAllKatas(page, limit);
    }

    return response;
  }

  @Post('/')
  public async createKata(kata: IKata): Promise<any> {
    let response: any = '';

    if (kata) {
      await createKata(kata).then((r) => {
        LogSuccess(`[/api/katas] Created Kata ${kata.name}`);
        response = {
          message: `Kata created successfully: ${kata.name}`,
        };
      });
    } else {
      LogWarning('[/api/kata] Register needs Kata entity');
      response = {
        message:
          'Kata not registered: Please, provide a Kata entity to create one',
      };
    }

    return response;
  }

  /**
   * Endpoint to delete the Kata by Id in the Colecction 'Katas' of DB
   * @param {string} id Id of kata to delete (optional)
   * @returns  Message informing if deletion was correct
   */
  @Delete('/')
  public async deleteKata(@Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/katas] Delete Kata By Id: ${id}`);

      await deleteKataById(id).then((r) => {
        response = {
          message: `Kata with ID ${id} deleted successfully`,
        };
      });
    } else {
      LogWarning('[/api/katas] Delete Kata Request without ID');

      response = {
        message: 'Please, provide an ID to remove from Database',
      };
    }

    return response;
  }

  /**
   * Endpoint to update the Kata by Id in the Colecction 'Katas' of DB
   * @param {string} id
   * @param {any} kata
   * @returns
   */
  @Put('/')
  public async updateKata(@Query() id: string, kata: IKata): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/katas] Update Kata By Id: ${id}`);

      await updateKataById(id, kata).then((r) => {
        response = {
          message: `Kata with ID ${id} updated successfully`,
        };
      });
    } else {
      LogWarning('[/api/katas] Update Kata Request without ID');

      response = {
        message: 'Please, provide an ID to update an existing kata',
      };
    }

    return response;
  }

  @Post('/upload')
  public async uploadKataFile(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
