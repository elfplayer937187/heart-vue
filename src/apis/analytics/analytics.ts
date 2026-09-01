import request from '@/utils/request'
import type { RespHomeData } from './type'
enum API {
  GET_ANALYTICS_DATA_URL = '/data-analytics/overview',
}

export const getAnalyticsData = () => request.get<any, RespHomeData>(API.GET_ANALYTICS_DATA_URL)
