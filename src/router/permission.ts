import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './index'
import useUserStore from '@/stores/UserStore'
import { getUserInfo, removeUserInfo } from '@/utils/userInfo'

// 不显示加载圈圈
nprogress.configure({ showSpinner: false })

// 全局前置守卫
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  document.title = '心理健康管理系统 - ' + ((to.meta.title as string) || '')
  nprogress.start()

  // 如果有token
  if (userStore.token) {
    let userInfo = null
    try {
      userInfo = getUserInfo()
    } catch {
      userInfo = null
    }
    // 如果没有用户信息
    if (!userInfo) {
      removeUserInfo()
      // 如果已经是登录页,直接放行,避免无限重定向
      if (to.path === '/back/login') {
        next()
      }
      // 如果是后台其他页面，则重定向到登录页
      else if (to.path.startsWith('/back')) {
        next('/back/login')
      }
      // 如果是不是后台页面，则放行
      else {
        next()
      }
    } else {
      // 如果有用户信息,并且持有token
      // 如果是后台用户
      if (userInfo.userType === 2) {
        if (to.path.startsWith('/back')) {
          next()
        } else {
          next('/back/dashboard')
        }
      }
      // 如果是前台用户
      else if (userInfo.userType === 1) {
        if (to.path.startsWith('/back') || to.path.startsWith('/auth')) {
          next('/home')
        } else {
          next()
        }
      }
      // 未知用户类型
      else {
        next('/notfound')
      }
    }
  } else {
    // 如果已经是登录页,直接放行,避免无限重定向
    if (to.path === '/auth/login') {
      next()
    }
    // 如果是后台其他页面，则重定向到登录页
    else if (to.path.startsWith('/back')) {
      next('/auth/login')
    }
    // 如果是前台其他页面，则放行
    else {
      next()
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})
