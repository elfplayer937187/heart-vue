import request from '@/utils/request'
import type { SessionResponse, SessionRequest } from './type'
enum API {
  // 获取咨询记录分页列表
  GET_SESSIONS_URL = '/psychological-chat/sessions',
}
export const getSessions = (data: SessionRequest) =>
  request.get<any, SessionResponse>(API.GET_SESSIONS_URL, { params: data })
