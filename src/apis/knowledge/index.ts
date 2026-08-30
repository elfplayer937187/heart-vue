import request from '@/utils/request'
import type {
  ResponseKnowledgeListType,
  ResponseKnowledgeArticleListType,
  KnowledgeArticleListRequestType,
} from './type'
enum API {
  GET_KNOWLEDGE_CATEGORY_URL = '/knowledge/category/tree',
  GET_KNOWLEDGE_ARTICLE_URL = '/knowledge/article/page',
}
// 获取知识分类列表
export const getKnowledgeCategoryList = () =>
  request.get<any, ResponseKnowledgeListType>(API.GET_KNOWLEDGE_CATEGORY_URL)
// 获取知识文章列表
export const getKnowledgeArticleList = (params?: KnowledgeArticleListRequestType) =>
  request.get<any, ResponseKnowledgeArticleListType>(API.GET_KNOWLEDGE_ARTICLE_URL, {
    params: params || {},
  })
