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
// 基础消息接口
interface BaseMessage {
  id: number
  sessionId: number
  senderType: number
  senderTypeDesc: string // 如：'用户' | 'AI助手'
  messageType: number
  messageTypeDesc: string // 如：'文本'
  content: string
  createdAt: string // ISO日期时间字符串
  contentLength: number
  contentPreview: string
}

// 用户消息接口
export interface UserMessage extends BaseMessage {
  senderType: 1
  senderTypeDesc: '用户'
}

// AI助手消息接口
export interface AIMessage extends BaseMessage {
  senderType: 2
  senderTypeDesc: 'AI助手'
  aiModel: string // AI消息特有字段
}
// 咨询记录分页列表响应数据
export type SessionResponse = BaseResponse<BasePageResponse<Session[]>>
// 响应的详细咨询对话数据
export type SessionMessagesResponse = BaseResponse<(UserMessage | AIMessage)[]>
