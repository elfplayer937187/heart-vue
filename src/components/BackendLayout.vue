<template>
  <div class="common-layout">
    <el-container class="flex relative">
      <!-- 顶部导航 -->
      <el-header
        class="w-[calc(100%-var(--aside-width))] absolute right-0 h-(--tabbar-height)! flex items-center shadow-2xl! justify-between"
      >
        <!-- 页面标题(左侧) -->
        <div class="flex">
          <el-button class="ml-4 mr-3">
            <el-icon>
              <Operation />
            </el-icon>
          </el-button>
          <h3 class="font-bold text-2xl text-black">{{ routeName }}</h3>
        </div>
        <!-- 用户头像 -->
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          class="mr-4"
        />
      </el-header>
      <!-- 主要内容区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="var(--aside-width)" class="h-screen bg-white">
          <div class="flex items-center pl-5! h-(--tabbar-height)!">
            <el-image :src="Robot" fit="fill" class="w-10 h-10" />
            <div class="right ml-2!">
              <h2 class="text-md font-bold">心理健康AI助手</h2>
              <p class="text-sm text-gray-400">管理后台</p>
            </div>
          </div>
          <el-menu
            active-text-color="#ec4899"
            class="bg-white text-gray-800"
            :default-active="activeIndex"
            @select="HandleSelectMenuItem"
          >
            <el-menu-item
              :index="route.name"
              v-for="route in allMenuItems"
              :key="route.path"
              class="hover:bg-pink-200! duration-200!"
            >
              {{ route.meta?.title }}
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主要内容区域 -->
        <el-main class="mt-(--tabbar-height)">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router/index'
import { useRoute } from 'vue-router'
import Robot from '@/assets/images/机器人.png'
import { computed, ref, watch } from 'vue'
import { Operation } from '@element-plus/icons-vue'

// 当前路由信息
const route = useRoute()

// 根据路由动态渲染菜单
const allRoutes = router.getRoutes()
const activeIndex = ref('dashboard')
const allMenuItems = allRoutes.filter((route) => route.name === 'back')[0]?.children

// 动态计算页面标题：取当前路由的 meta.title，否则取路由 name
const routeName = computed(() => (route.meta?.title as string) || route.name)

const HandleSelectMenuItem = (index: string) => {
  router.push({ name: index })
}

// 菜单高亮与路由同步：路由变化时更新 activeIndex
watch(
  () => route.name,
  (name) => {
    if (name) activeIndex.value = name as string
  },
  { immediate: true },
)
</script>

<style scoped>
.menu {
  --el-menu-active-color: #409eff;
}
</style>
