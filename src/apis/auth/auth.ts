import request from '@/utils/request'
import type { ResponseUserInfoType, LoginRequestType } from './type'
import type { BaseResponse } from '../baseType'
enum API {
  LOGIN_URL = '/user/login',
  // 退出登录
  LOGOUT_URL = '/user/logout',
}

export const UserLogin = (data: LoginRequestType) =>
  request.post<any, ResponseUserInfoType>(API.LOGIN_URL, data)
// 退出登录
export const UserLogout = () => request.post<any, BaseResponse<string>>(API.LOGOUT_URL)
