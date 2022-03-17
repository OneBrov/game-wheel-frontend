import { AxiosResponse } from 'axios';
import { dbField, GameType } from '../../types/GameType';
import $api from '../api-client';

export default class GamesService {
  static async getGames(
    params: string, 
    offset: number, 
    maxCount: number
  ): Promise<AxiosResponse<GameType[]>> {
    return await $api.get(`/games?${params}&&offset=${offset}&&maxCount=${maxCount}`);
  }

  static async getRandomGames(params: string): Promise<AxiosResponse<GameType[]>> {
    return await $api.get(`/games?${params}&&isRandom=true`);
  }

  static async getTags(): Promise<AxiosResponse<dbField[]>> {
    return await $api.get('/games/tags');
  }

  static async getGenres(): Promise<AxiosResponse<dbField[]>> {
    return await $api.get('/games/genres');
  }

  static async getPublishers(): Promise<AxiosResponse<dbField[]>> {
    return await $api.get('/games/publishers');
  }

  static async getDevelopers(): Promise<AxiosResponse<dbField[]>> {
    return await $api.get('/games/developers');
  }
}