import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  // 后台管理路由
  {
    path: '/back',
    name: 'back',
    component: () => import('@/components/BackendLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/components/MainChild/DashBoard.vue'),
      },
    ],
  },
  // 登录路由
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/components/AuthLayout.vue'),
  },
  // 404路由
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/components/NotFound.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
