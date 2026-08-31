import request from '@/utils/request'
import type {
  ResponseKnowledgeCategoryListType,
  KnowledgeArticleListRequestType,
  ResponseKnowledgeArticleListType,
  ImageUploadParamsType,
  ResponseImageUploadType,
  ResponseKnowledgeArticleStatusType,
} from './type'
import type { BaseResponse } from '../baseType'
enum API {
  GET_KNOWLEDGE_CATEGORY_URL = '/knowledge/category/tree',
  GET_KNOWLEDGE_ARTICLE_URL = '/knowledge/article/page',
  // 新增知识文章
  ADD_KNOWLEDGE_ARTICLE_URL = '/knowledge/article',
  // 处理文件上传
  UPLOAD_IMAGE_URL = '/file/upload',
  // 上架知识文章
  UP_KNOWLEDGE_ARTICLE_URL = '/knowledge/article/{id}/status',
  // 删除知识文章
  DELETE_KNOWLEDGE_ARTICLE_URL = '/knowledge/article/{id}',
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
// 上架/下架知识文章
export const updateKnowledgeArticleStatus = (id: string, status: string) =>
  request.put<any, ResponseKnowledgeArticleStatusType>(
    API.UP_KNOWLEDGE_ARTICLE_URL.replace('{id}', id),
    { status },
  )
// 处理文件上传
export const uploadImage = (file: File, businessId: string) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('businessId', businessId)
  formData.append('businessType', 'ARTICLE')
  formData.append('businessField', 'cover')
  return request.post<ImageUploadParamsType, ResponseImageUploadType>(
    API.UPLOAD_IMAGE_URL,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}
// 删除知识文章
export const deleteKnowledgeArticle = (id: string) =>
  request.delete<any, BaseResponse<null>>(API.DELETE_KNOWLEDGE_ARTICLE_URL.replace('{id}', id))
