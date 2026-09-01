import request from '@/utils/request'
enum API {
  GET_ANALYTICS_DATA_URL = '/data-analytics/overview',
}

export const getAnalyticsData = () => request.get<any, any>(API.GET_ANALYTICS_DATA_URL)
