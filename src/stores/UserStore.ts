import { defineStore } from 'pinia'
import { getToken, removeToken } from '@/utils/token'
import type { UserInfo } from '@/apis/auth/type'
export default defineStore('UserStore', {
  state: () => ({
    token: getToken(),
    userInfo: null as UserInfo | null,
  }),
  actions: {
    userLogout() {
      this.token = ''
      this.userInfo = null
      removeToken()
    },
  },
})
