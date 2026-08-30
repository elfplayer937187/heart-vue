import type { BaseResponse } from '../baseType'
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
export type ResponseKnowledgeListType = BaseResponse<KnowledgeListType[]>
