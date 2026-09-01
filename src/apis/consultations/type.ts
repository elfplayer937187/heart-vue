import type { BaseResponse, BasePageResponse } from '../baseType'
// 咨询记录分页列表数据
export interface Session {
  id: number
  userId: number
  userNickname: string
  sessionTitle: string
  startedAt: string
  durationMinutes: number
  messageCount: number
  lastMessageContent: string
  lastMessageTime: string
}
// 咨询记录分页列表请求参数
export interface SessionRequest {
  /**
   * 当前页
   */
  currentPage: string | number
  /**
   * 情绪标签
   */
  emotionTag?: string
  /**
   * 分页数
   */
  size: string | number
}
// 咨询记录分页列表响应数据
export type SessionResponse = BaseResponse<BasePageResponse<Session[]>>
