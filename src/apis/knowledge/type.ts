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
// 新增知识文章请求类型
export interface ApifoxModel {
  /**
   * 所属分类
   */
  categoryId: number
  /**
   * 文章内容
   */
  content: string
  /**
   * 封面图片
   */
  coverImage: string
  /**
   * id
   */
  id: string
  /**
   * 文章摘要
   */
  summary: string
  /**
   * 标签
   */
  tags: string
  /**
   * 文章标题
   */
  title: string
}

// 图片上传参数
export interface ImageUploadParamsType {
  businessField: string
  /**
   * 文件id
   */
  businessId: string
  /**
   * 类型
   */
  businessType: string
  /**
   * 文件主体
   */
  file: string
}
// 图片响应参数
export interface ImageUploadType {
  /** 业务领域（如：cover 表示封面） */
  businessField: string
  /** 业务ID（UUID格式） */
  businessId: string
  /** 业务类型（如：ARTICLE 表示文章） */
  businessType: string
  /** 业务类型描述（如：文章封面） */
  businessTypeDesc: string
  /** 创建时间（格式：YYYY-MM-DD HH:mm:ss） */
  createTime: string
  /** 文件扩展名（不含点） */
  fileExtension: string
  /** 文件存储路径 */
  filePath: string
  /** 文件大小（字节） */
  fileSize: number
  /** 文件类型（如：IMG 表示图片） */
  fileType: string
  /** 文件类型描述（如：图片） */
  fileTypeDesc: string
  /** 文件ID（自增主键） */
  id: number
  /** 是否已过期 */
  isExpired: boolean
  /** 是否为临时文件 */
  isTemp: boolean
  /** 原始文件名（含扩展名） */
  originalName: string
  /** 状态（1 表示正常/有效） */
  status: number
  /** 上传用户ID */
  uploadUserId: number
}
// 上架/下架知识文章返回类型
export interface KnowledgeArticleStatusType {
  /** 文章ID */
  id: string
  /** 分类ID */
  categoryId: number
  /** 分类名称 */
  categoryName: string
  /** 文章标题 */
  title: string
  /** 文章摘要 */
  summary: string
  /** 文章内容 */
  content: string
  /** 封面图片URL */
  coverImage: string
  /** 标签（逗号分隔的字符串） */
  tags: string
  /** 标签数组 */
  tagArray: string[]
  /** 作者ID */
  authorId: number
  /** 作者名称 */
  authorName: string
  /** 阅读次数 */
  readCount: number
  /** 状态（1 表示已发布） */
  status: number
  /** 状态文本描述 */
  statusText: string
  /** 是否已收藏 */
  isFavorited: boolean
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
// 图片响应参数
export type ResponseImageUploadType = BaseResponse<ImageUploadType>

export type ResponseKnowledgeArticleStatusType = BaseResponse<KnowledgeArticleStatusType>
