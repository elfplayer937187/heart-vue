<template>
  <div class="flex">
    <!-- 左侧图片展示 -->
    <div class="flex-1 h-screen items-center justify-center left-side">
      <div class="flex flex-col text-white items-center">
        <h1 class="font-bold text-4xl mt-40!">心理AI助手</h1>
        <p class="w-115 text-xl text-center mb-5 leading-relaxed mt-5!">
          每个深夜，每个焦虑的时刻，我们都在这里。不必独自承受，让心与心的连接温暖您的每一天
        </p>
        <div class="w-40 h-40 rounded-full flex items-center justify-center img-ball mt-8!">
          <el-image style="width: 90px; height: 90px" :src="iconUrl" alt="心理AI助手" />
        </div>
      </div>
    </div>
    <!-- 右侧内容展示 -->
    <div class="flex flex-1 items-center justify-center h-screen">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import iconUrl from '@/assets/images/robot-fill.png'
</script>

<style scoped>
.left-side {
  background: linear-gradient(90deg, rgb(74, 156, 140) 0%, rgb(61, 138, 122) 100%);
}
.img-ball {
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}
</style>
