import request from '@/utils/request'
import type { EmotionDiaryReq, EmotionDiaryResp } from './type'
enum API {
  GET_EMOTION_LIST = '/emotion-diary/admin/page',
  // 删除情绪日志
  DELETE_EMOTION_DIARY = '/emotion-diary/admin/{id}',
}
// 获取情绪日记列表
export const getEmotionList = (params: EmotionDiaryReq) =>
  request.get<any, EmotionDiaryResp>(API.GET_EMOTION_LIST, { params })

// 删除情绪日志
export const deleteEmotionDiary = (id: string) =>
  request.delete<any, EmotionDiaryResp>(API.DELETE_EMOTION_DIARY.replace('{id}', id))
