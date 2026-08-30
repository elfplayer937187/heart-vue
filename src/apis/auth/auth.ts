import request from '@/utils/request'
import type { ResponseUserInfoType, LoginRequestType } from './type'
enum API {
  LOGIN_URL = '/api/user/login',
}

export const UserLogin = (data: LoginRequestType) =>
  request.post<any, ResponseUserInfoType>(API.LOGIN_URL, data)
