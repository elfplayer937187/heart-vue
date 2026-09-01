export interface BaseResponse<T> {
  code: number | string
  message: string
  data?: T
  success: boolean
  msg?: string
}

export interface BasePageResponse<T> {
  records: T
  total: number
  size: number
  current: number
  pages: number
}
