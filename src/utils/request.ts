import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from './token'
// 创建请求实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = getToken()
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    //处理网络错误
    let msg = ''
    const status = error.response.status
    switch (status) {
      case 400:
        msg = '请求参数错误'
        break
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)

export default request
