import request from '@/utils/request'
import type { SessionResponse, SessionRequest, SessionMessagesResponse } from './type'
enum API {
  // 获取咨询记录分页列表
  GET_SESSIONS_URL = '/psychological-chat/sessions',
  // 获取咨询对话记录分页列表
  GET_SESSION_MESSAGES_URL = '/psychological-chat/sessions/{sessionId}/messages',
}
export const getSessions = (data: SessionRequest) =>
  request.get<any, SessionResponse>(API.GET_SESSIONS_URL, { params: data })
// 获取咨询对话记录分页列表
export const getSessionMessages = (id: string) =>
  request.get<any, SessionMessagesResponse>(API.GET_SESSION_MESSAGES_URL.replace('{sessionId}', id))
