import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
// 创建请求实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
})
// 请求拦截器
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    let msg = ''
    const status = error.response?.status
    switch (status) {
      case 401:
        msg = '请先登录'
        break
      case 403:
        msg = '无权限'
        break
      case 404:
        msg = '请求不存在'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '网络状况异常'
    }
    ElMessage({
      message: msg,
      type: 'error',
    })
    // 这里返回错误信息，让调用者处理
    return Promise.reject(error)
  },
)

export default request
