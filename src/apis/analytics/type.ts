import type { BaseResponse } from '../baseType'

// 用户活动统计
interface userActivityItem {
  date: number
  activeUsers: number
  newUsers: number
  diaryUsers: number
  consultationUsers: number
}
// 咨询统计
interface consultationStatsItem {
  totalSessions: number
  avgDurationMinutes: number
  dailyTrend: dailyTrendItem[]
}
// 每日咨询统计
interface dailyTrendItem {
  date: string
  sessionCount: number
  userCount: number
}
// 情绪趋势统计
interface emotionTrendItem {
  date: string
  avgMoodScore: number
  recordCount: number
  positiveRatio: number
  negativeRatio: number
  dominantEmotion: string
}
// 情绪热力图
interface emotionHeatmap {
  gridData: gridDataItem[]
  emotionDistribution: { 开心: number; 平静: number }
  peakEmotionTime: string
  dateRange: string
}
// 情绪热力图网格数据
interface gridDataItem {
  x: number
  y: number
  value: number
  avgMoodScore: number
  dominantEmotion: string
}
// 系统概览
interface systemOverview {
  totalUsers: number
  activeUsers: number
  totalDiaries: number
  totalSessions: number
  avgMoodScore: number
  todayNewUsers: number
  todayNewDiaries: number
  todayNewSessions: number
}

// 首页数据总览
interface dataType {
  userActivity: userActivityItem[]
  consultationStats: consultationStatsItem[]
  emotionTrend: emotionTrendItem[]
  emotionHeatmap: emotionHeatmap
  systemOverview: systemOverview
}

export type RespHomeData = BaseResponse<dataType>
