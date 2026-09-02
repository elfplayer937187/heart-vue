<template>
  <el-card>
    <pageHead title="数据分析" class="mb-6!" />
    <el-row :gutter="20" class="mb-6!">
      <el-col :span="6">
        <el-card class="inner-card">
          <!-- 头像 -->
          <div class="mr-6! w-20! h-20!">
            <img :src="user1" class="bg-purple-500 p-4! rounded-2xl" alt="用户头像" />
          </div>
          <!-- 右侧数据 -->
          <div class="flex flex-col">
            <h3 class="text-lg! text-gray-500 font-bold!">用户总数</h3>
            <span class="text-md! text-black font-bold ml-0.5!">3</span>
            <span class="text-md! text-gray-400 font-bold">活跃用户:3</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="inner-card">
          <!-- 情绪日志 -->
          <div class="mr-6! w-20! h-20!">
            <img
              :src="smile"
              class="bg-linear-to-br from-pink-500 to-orange-400 p-4! rounded-2xl"
              alt="情绪日志"
            />
          </div>
          <div class="flex flex-col">
            <h3 class="text-lg! text-gray-500 font-bold!">情绪日志</h3>
            <span class="text-md! text-black font-bold ml-0.5!">12</span>
            <span class="text-md! text-gray-400 font-bold">本月新增:5</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="inner-card">
          <!-- 咨询会话 -->
          <div class="mr-6! w-20! h-20!">
            <img
              :src="comment"
              class="bg-linear-to-br from-blue-500 to-cyan-400 p-4! rounded-2xl"
              alt="咨询会话"
            />
          </div>
          <div class="flex flex-col">
            <h3 class="text-lg! text-gray-500 font-bold!">咨询会话</h3>
            <span class="text-md! text-black font-bold ml-0.5!">8</span>
            <span class="text-md! text-gray-400 font-bold">待处理:2</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="inner-card">
          <!-- 平均情绪 -->
          <div class="mr-6! w-20! h-20!">
            <img
              :src="like"
              class="bg-linear-to-br from-green-500 to-emerald-400 p-4! rounded-2xl"
              alt="平均情绪"
            />
          </div>
          <div class="flex flex-col">
            <h3 class="text-lg! text-gray-500 font-bold!">平均情绪</h3>
            <span class="text-md! text-black font-bold ml-0.5!">积极</span>
            <span class="text-md! text-gray-400 font-bold">评分:4.6</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mb-6!">
      <el-col :span="12">
        <el-card> </el-card>
      </el-col>
      <el-col :span="12">
        <el-card> </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import pageHead from '@/components/PageHead.vue'
import user1 from '@/assets/images/user1.png'
import like from '@/assets/images/like(1).png'
import comment from '@/assets/images/comments(1).png'
import smile from '@/assets/images/smile(1).png'
</script>

<style scoped lang="css">
.inner-card :deep(.el-card__body) {
  display: flex;
  align-items: center;
}
</style>
