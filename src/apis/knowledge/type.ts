import request from '@/utils/request'

enum API {
  GET_KNOWLEDGE_LIST_URL = '/knowledge/category/tree',
}

export const getKnowledgeList = () => request.get<any, any>(API.GET_KNOWLEDGE_LIST_URL)
