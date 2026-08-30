import type { BaseResponse, BasePageResponse } from '../baseType'

// 知识分类列表项
export interface KnowledgeCategoryItemType {
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
  /** 作者 */
  authorName?: string
  /** 分类 */
  categoryId?: string
  /** 当前页 */
  currentPage?: string
  /** 分页数 */
  size?: string
  /** 状态 */
  status?: string
  /** 文章标题 */
  title?: string
}

// 知识文章列表项
export interface KnowledgeArticleItemType {
  /** 文章ID */
  id: string
  /** 分类ID */
  categoryId: number
  /** 分类名称 */
  categoryName: string
  /** 标题 */
  title: string
  /** 摘要 */
  summary: string
  /** 标签 */
  tags: string
  /** 作者名称 */
  authorName: string
  /** 阅读数量 */
  readCount: number
  /** 状态：2-已下线 */
  status: number
  /** 状态文本描述 */
  statusText: string
  /** 当前用户是否已收藏 */
  isFavorited: boolean
  /** 收藏数量 */
  favoriteCount: number
  /** 发布时间 */
  publishedAt: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

// 分类列表响应
export type ResponseKnowledgeCategoryListType = BaseResponse<KnowledgeCategoryItemType[]>
// 文章列表响应
export type ResponseKnowledgeArticleListType = BaseResponse<
  BasePageResponse<KnowledgeArticleItemType[]>
>
