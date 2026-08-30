import type { BaseResponse, BasePageResponse } from '../baseType'
// 知识分类列表类型
export interface KnowledgeListType {
  id: number
  categoryName: string
  description: string
  sortOrder: number
  status: number
  statusText: string
  articleCount: number
  createdAt: string
  updatedAt: string
}

// 知识文章列表请求类型
export interface KnowledgeArticleListRequestType {
  /**
   * 作者
   */
  authorName?: string
  /**
   * 分类
   */
  categoryId?: string
  /**
   * 当前页
   */
  currentPage?: string
  /**
   * 分页数
   */
  size?: string
  /**
   * 状态
   */
  status?: string
  /**
   * 文章标题
   */
  title?: string
}
// 知识文章列表类型
export interface KnowledgeArticleListType {
  id: string
  categoryId: number
  categoryName: string
  title: string
  summary: string
  tags: string
  authorName: string
  readCount: number
  status: number
  statusText: string
  isFavorited: boolean
  favoriteCount: number
  publishedAt: string
  createdAt: string
  updatedAt: string
}
// 知识分类列表响应类型
export type ResponseKnowledgeListType = BaseResponse<KnowledgeListType[]>
// 知识文章列表响应类型
export type ResponseKnowledgeArticleListType = BaseResponse<
  BasePageResponse<KnowledgeArticleListType>
>
