import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const BackendRoutes: RouteRecordRaw[] = [
  // 后台管理路由
  {
    path: '/back',
    name: 'back',
    component: () => import('@/components/BackendLayout.vue'),
    redirect: '/back/dashboard',
    children: [
      // 首页数据分析
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashBoard.vue'),
        meta: {
          title: '数据分析',
          icon: 'PieChart',
        },
      },
      // 知识面板
      {
        path: 'knowledge',
        name: 'knowledge',
        component: () => import('@/views/KowledgeBoard.vue'),
        meta: {
          title: '知识文章',
          icon: 'Document',
        },
      },
      // consultation咨询记录
      {
        path: 'consultation',
        name: 'consultation',
        component: () => import('@/views/ConsultationsBoard.vue'),
        meta: {
          title: '咨询记录',
          icon: 'Message',
        },
      },
      // 情绪日志
      {
        path: 'emotional',
        name: 'emotional',
        component: () => import('@/views/EmotionalBoard.vue'),
        meta: {
          title: '情绪日志',
          icon: 'User',
        },
      },
    ],
  },
  // 登录路由
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/components/AuthLayout.vue'),
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/AuthChild/LoginBoard.vue'),
      },
    ],
  },
]
const frontendRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/components/FrontendLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home.vue'),
      },
      {
        path: 'consultation',
        component: () => import('@/views/consultation.vue'),
      },
      {
        path: 'emotion-diary',
        component: () => import('@/views/emotionDiary.vue'),
      },
      {
        path: 'knowledge',
        component: () => import('@/views/frontendKnowledge.vue'),
      },
      {
        path: 'knowledge/article/:id',
        component: () => import('@/views/articleDetail.vue'),
        props: true,
      },
    ],
  },
  // 404路由
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/components/NotFound.vue'),
  },
]
const router = createRouter({
  routes: [...frontendRoutes, ...BackendRoutes],
  history: createWebHistory(),
})

export default router
