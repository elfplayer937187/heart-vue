<template>
  <div class="common-layout">
    <el-container class="flex relative">
      <!-- 顶部导航 -->
      <el-header
        :style="{ width: `calc(100% - ${asideWidth})` }"
        class="absolute right-0 h-(--tabbar-height)! flex items-center shadow-xl! justify-between transition-all duration-300"
      >
        <!-- 页面标题(左侧) -->
        <div class="flex">
          <!-- 折叠按钮 -->
          <el-button class="ml-4 mr-3" @click="toggleTabbarFoldButton">
            <el-icon class="transition-transform duration-300">
              <Fold v-if="!tabbarFoldButton" />
              <Expand v-else />
            </el-icon>
          </el-button>
          <h3 class="font-bold text-2xl text-black">{{ routeName }}</h3>
        </div>
        <!-- 右侧用户信息 -->
        <div class="flex items-center gap-2 mr-4!">
          <!-- 用户头像 -->
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            class="mr-4"
          />
          <!-- 用户名称 -->
          <el-dropdown>
            <span class="el-dropdown-link cursor-pointer">
              {{ userName }}
              <el-icon class="hover-arrow transition-transform duration-300">
                <ArrowDown />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="HandleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 主要内容区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside
          :style="{ width: asideWidth }"
          class="h-screen bg-white transition-all! duration-300 overflow-hidden"
        >
          <el-menu
            :collapse="tabbarFoldButton"
            active-text-color="#ec4899"
            class="bg-white text-gray-800 border-none!"
            :default-active="activeIndex"
            :collapse-transition="false"
            @select="HandleSelectMenuItem"
          >
            <div class="flex items-center pl-5! h-(--tabbar-height)! whitespace-nowrap">
              <el-image :src="Robot" fit="fill" class="w-10 h-10 shrink-0" />
              <div v-show="!tabbarFoldButton" class="right ml-2!">
                <h2 class="text-md font-bold">心理健康AI助手</h2>
                <p class="text-sm text-gray-400">管理后台</p>
              </div>
            </div>
            <el-menu-item
              :index="route.name"
              v-for="route in allMenuItems"
              :key="route.path"
              class="hover:bg-pink-200! duration-200!"
            >
              <el-icon>
                <component :is="route.meta?.icon" />
              </el-icon>
              <template #title>
                <span>{{ route.meta?.title }}</span>
              </template>
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
import { useConfigStore } from '@/stores/ConfigStore'
import { storeToRefs } from 'pinia'
// 当前路由信息
const route = useRoute()

// 配置Store
const configStore = useConfigStore()
const { tabbarFoldButton } = storeToRefs(configStore)
// 根据路由动态渲染菜单
const allRoutes = router.getRoutes()
const activeIndex = ref('dashboard')
const allMenuItems = allRoutes.filter((route) => route.name === 'back')[0]?.children

// 动态计算页面标题：取当前路由的 meta.title，否则取路由 name
const routeName = computed(() => (route.meta?.title as string) || route.name)

// 侧边栏宽度：折叠时收缩到 4rem，展开时用 --aside-width
const asideWidth = computed(() =>
  tabbarFoldButton.value ? 'var(--aside-collapsed-width)' : 'var(--aside-width)',
)

// 用户名称（暂定）
const userName = ref('管理员')
const HandleSelectMenuItem = (index: string) => {
  router.push({ name: index })
}

// 折叠按钮
const toggleTabbarFoldButton = () => {
  tabbarFoldButton.value = !tabbarFoldButton.value
}

// 菜单高亮与路由同步：路由变化时更新 activeIndex
watch(
  () => route.name,
  (name) => {
    if (name) activeIndex.value = name as string
  },
  { immediate: true },
)

// 退出登录
const HandleLogout = () => {
  router.push('/auth/login')
}
</script>

<style scoped>
.menu {
  --el-menu-active-color: #409eff;
}
.el-dropdown-link:hover .hover-arrow {
  transform: rotate(180deg);
}
.el-menu {
  border-image: none !important;
}
</style>
