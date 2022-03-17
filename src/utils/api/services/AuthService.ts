import { AxiosResponse } from 'axios';
import $api from '../api-client';

export interface SuccessAuthResponse {
    access_token: string;
}

export default class AuthService {
  static async login(
    nickname: string, 
    password: string
  ): Promise<AxiosResponse<SuccessAuthResponse>> {
    return await $api.post<SuccessAuthResponse>('/users/login', {nickname, password});
  }

  static async registration(
    nickname: string, 
    password: string
  ): Promise<AxiosResponse<SuccessAuthResponse>> {
    return await $api.post<SuccessAuthResponse>('/users/registration', { 
      nickname, 
      password 
    });
  }

  static async refresh(): Promise<AxiosResponse<SuccessAuthResponse>> {
    return await $api.get<SuccessAuthResponse>('/users/refreshToken');
  }
}