// 设置token
export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}
// 获取token
export const getToken = () => {
  return localStorage.getItem('token') || ''
}
// 删除token
export const removeToken = () => {
  localStorage.removeItem('token')
}
