import { AxiosResponse } from 'axios';
import { GameType } from '../../types/GameType';
import $api from '../api-client';


export default class GamesHistoryService {
  static async getGames(): Promise<AxiosResponse<Array<GameType>>> {
    return await $api.get<Array<GameType>>('/history');
  }

  static async createDroppedGame(gameId: number): Promise<any> {
    return await $api.post('/history', { gameId });
  }
}