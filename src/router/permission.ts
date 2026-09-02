import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './index'
import useUserStore from '@/stores/UserStore'

// 不显示加载圈圈
nprogress.configure({ showSpinner: false })

// 全局前置守卫
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  document.title = '心理健康管理系统 - ' + ((to.meta.title as string) || '')
  nprogress.start()

  const isAuthPage = to.path.includes('/auth')

  if (!userStore.token) {
    // 未登录：只放行登录相关页面，其余重定向到登录页
    if (isAuthPage) next()
    else next('/auth/login')
  } else {
    // 已登录：登录页/首页重定向到后台首页，其余正常放行
    if (isAuthPage || to.path === '/') next('/back/dashboard')
    else next()
  }
})

router.afterEach(() => {
  nprogress.done()
})
