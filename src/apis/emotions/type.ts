import type { BasePageResponse, BaseResponse } from '../baseType'

export interface EmotionDiaryRecord {
  /** 记录ID */
  id: number
  /** 用户ID */
  userId: number
  /** 用户名 */
  username: string
  /** 用户昵称 */
  nickname: string
  /** 日记日期 */
  diaryDate: string // 格式: YYYY-MM-DD
  /** 心情评分 (1-10) */
  moodScore: number
  /** 主要情绪 */
  dominantEmotion: string
  /** 情绪触发因素 (可为空) */
  emotionTriggers?: string
  /** 日记内容 */
  diaryContent: string
  /** 日记内容预览（截断） */
  diaryContentPreview: string
  /** 睡眠质量评分 (1-5) */
  sleepQuality: number
  /** 压力水平评分 (1-5) */
  stressLevel: number
  /** 创建时间 */
  createdAt: string // 格式: YYYY-MM-DD HH:mm:ss
  /** 更新时间 */
  updatedAt: string // 格式: YYYY-MM-DD HH:mm:ss
  /** AI 情绪分析数据 (JSON 字符串) */
  aiEmotionAnalysis?: string
  /** AI 分析更新时间 */
  aiAnalysisUpdatedAt?: string // 格式: YYYY-MM-DD HH:mm:ss
  /** 是否有 AI 情绪分析 */
  hasAiEmotionAnalysis: boolean
  /** AI 分析状态 */
  aiAnalysisStatus: string
  /** 内容长度 */
  contentLength: number
}
// AI 情绪分析数据
export interface AiEmotionAnalysis {
  primaryEmotion: string // 主要情绪
  emotionScore: number // 情绪评分 (0-100)
  isNegative: boolean // 是否负面情绪
  riskLevel: number // 风险等级 (0-3)
  keywords: string[] // 关键词列表
  suggestion: string // 建议
  icon: string // 情绪图标
  label: string // 情绪标签
  riskDescription: string // 风险描述
  improvementSuggestions: string[] // 改进建议列表
  timestamp: number // 时间戳
}
/** 情绪日记列表请求 */
export interface EmotionDiaryReq {
  /**
   * 当前页
   */
  current: string | number
  /**
   * 主要情绪
   */
  dominantEmotion?: string
  /**
   * 情绪分上限
   */
  maxMoodScore?: number
  /**
   * 情绪分下限
   */
  minMoodScore?: number
  /**
   * 分页数
   */
  size: string | number
  /**
   * 用户id
   */
  userId?: string
}

/** 情绪日记列表响应 */
export type EmotionDiaryResp = BaseResponse<BasePageResponse<EmotionDiaryRecord[]>>
