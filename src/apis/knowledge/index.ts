import request from '@/utils/request'
import type {
  ResponseKnowledgeCategoryListType,
  KnowledgeArticleListRequestType,
  ResponseKnowledgeArticleListType,
} from './type'
enum API {
  GET_KNOWLEDGE_CATEGORY_URL = '/knowledge/category/tree',
  GET_KNOWLEDGE_ARTICLE_URL = '/knowledge/article/page',
  // 新增知识文章
  ADD_KNOWLEDGE_ARTICLE_URL = '/knowledge/article',
}
// 获取知识分类列表
export const getKnowledgeCategoryList = () =>
  request.get<any, ResponseKnowledgeCategoryListType>(API.GET_KNOWLEDGE_CATEGORY_URL)

// 获取知识文章列表
export const getKnowledgeArticleList = (params?: KnowledgeArticleListRequestType) =>
  request.get<KnowledgeArticleListRequestType, ResponseKnowledgeArticleListType>(
    API.GET_KNOWLEDGE_ARTICLE_URL,
    {
      params: params || {},
    },
  )
// 新增知识文章
export const addKnowledgeArticle = (data: any) =>
  request.post<any, any>(API.ADD_KNOWLEDGE_ARTICLE_URL, data)
