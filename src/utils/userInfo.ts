import type { UserInfo } from '@/apis/auth/type'

export function saveUserInfo(userInfo: UserInfo) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

export function getUserInfo(): UserInfo | null {
  if (localStorage.getItem('userInfo')) {
    return JSON.parse(localStorage.getItem('userInfo') as string)
  } else {
    return null
  }
}

export function removeUserInfo() {
  localStorage.removeItem('userInfo')
}
