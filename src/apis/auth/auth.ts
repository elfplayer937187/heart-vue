import request from '@/utils/request'
enum API {
  LOGIN_URL = '/api/user/login',
}

export const login = (data: any) => request.post<any, any>(API.LOGIN_URL, data)
