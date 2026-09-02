import { defineStore } from 'pinia'
import { getToken, removeToken } from '@/utils/token'
import { getUserInfo, removeUserInfo } from '@/utils/userInfo'
export default defineStore('UserStore', {
  state: () => ({
    token: getToken() ?? '',
    userInfo: getUserInfo(),
  }),
  actions: {
    userLogout() {
      this.token = ''
      this.userInfo = null
      removeToken()
      removeUserInfo()
    },
  },
})
