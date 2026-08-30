import type { BaseResponse } from '../baseType'
// 登录请求类型
export interface LoginRequestType {
  username: string
  password: string
}
// 用户信息类型
export interface UserInfo {
  id: number
  username: string
  email: string
  nickname: string
  avatar: string
  phone: string
  gender: number
  genderDisplayName: string
  birthday: string
  userType: number
  userTypeDisplayName: string
  status: number
  statusDisplayName: string
  displayName: string
  createdAt: string
  updatedAt: string
}
export interface UserInfoResponseType {
  userInfo: UserInfo
  token: string
  roleType: number
}
// 用户信息响应类型
export type ResponseUserInfoType = BaseResponse<UserInfoResponseType | null>
