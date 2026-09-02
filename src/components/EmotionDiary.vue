<template>
  <el-dialog v-model="visible" title="情绪日记详情" width="80%!">
    <template v-if="emotionDiaryDialogInfo">
      <!-- 用户信息 -->
      <div class="">
        <h3 class="text-lg! font-bold!">用户信息</h3>
        <div class="flex items-center mt-2!">
          <h4 class="left-gray-box">用户姓名</h4>
          <span class="right-white-box">{{ emotionDiaryDialogInfo.username }}</span>
          <h4 class="left-gray-box">昵称</h4>
          <span class="right-white-box">{{ emotionDiaryDialogInfo.nickname }}</span>
        </div>
        <div class="flex items-center">
          <h4 class="left-gray-box">用户ID</h4>
          <span class="right-white-box">{{ emotionDiaryDialogInfo.userId }}</span>
          <h4 class="left-gray-box">记录日期</h4>
          <span class="right-white-box">{{ emotionDiaryDialogInfo.diaryDate }}</span>
        </div>
      </div>
      <!-- 情绪状态 -->
      <div class="mt-4!">
        <h3 class="text-lg! font-bold!">情绪状态</h3>
        <div class="flex items-center mt-2!">
          <h4 class="left-gray-box w-[15%]!">情绪评分</h4>
          <span class="right-white-box w-[30%]!">
            <el-rate
              :model-value="emotionDiaryDialogInfo?.moodScore ?? 0"
              :max="10"
              disabled
              size="small"
            />
          </span>
          <h4 class="left-gray-box w-[15%]!">主要情绪</h4>
          <span class="right-white-box w-[30%]!">{{
            emotionDiaryDialogInfo?.dominantEmotion ?? '-'
          }}</span>
        </div>
        <div class="flex items-center">
          <h4 class="left-gray-box w-[15%]!">睡眠质量</h4>
          <span class="right-white-box w-[30%]!">{{
            emotionDiaryDialogInfo?.sleepQuality ?? '-'
          }}</span>
          <h4 class="left-gray-box w-[15%]!">压力水平</h4>
          <span class="right-white-box w-[30%]!">{{
            emotionDiaryDialogInfo?.stressLevel ?? '-'
          }}</span>
        </div>
      </div>
      <!-- 日记内容 -->
      <div class="mt-6!">
        <h3 class="text-lg! font-bold!">日记内容</h3>
        <div class="flex items-center mt-2!">
          <h4 class="left-gray-box w-[50%]!">情绪触发因素</h4>
          <span class="right-white-box w-[50%]!">{{
            emotionDiaryDialogInfo?.emotionTriggers ?? '-'
          }}</span>
        </div>
        <div class="flex items-center">
          <h4 class="left-gray-box w-[50%]!">日记内容</h4>
          <span class="right-white-box w-[50%]!">{{
            emotionDiaryDialogInfo?.diaryContent ?? '-'
          }}</span>
        </div>
      </div>
      <!-- AI情绪分析结果 -->
      <div class="mt-6!">
        <h3 class="text-lg! font-bold!">AI情绪分析结果</h3>
        <div class="flex items-center mt-2!">
          <h4 class="left-gray-box w-[30%]!">主要情绪</h4>
          <span class="right-white-box w-[10%]!">{{
            aiEmotionAnalysis?.primaryEmotion ?? '-'
          }}</span>
          <h4 class="left-gray-box w-[30%]!">情绪强度</h4>
          <span class="right-white-box w-[30%]!">{{ aiEmotionAnalysis?.emotionScore ?? '-' }}</span>
        </div>
        <div class="flex items-center">
          <h4 class="left-gray-box w-[30%]!">风险等级</h4>
          <span class="right-white-box w-[10%]!">{{ aiEmotionAnalysis?.riskLevel ?? '-' }}</span>
          <h4 class="left-gray-box w-[30%]!">情绪性质</h4>
          <span class="right-white-box w-[30%]!">{{ aiEmotionAnalysis?.label ?? '-' }}</span>
        </div>
      </div>
      <!-- 专业建议 -->
      <div class="bg-gray-100! p-4! rounded-lg! mt-6!">
        <div class="">
          <h3 class="text-lg! font-bold!">专业建议</h3>
          <p class="right-white-box w-[80%]! bg-white! rounded-lg! mt-3!">
            {{ aiEmotionAnalysis?.suggestion ?? '-' }}
          </p>
        </div>
      </div>
      <!-- 风险评估 -->
      <div class="bg-gray-100! p-4! rounded-lg! mt-6!">
        <div class="">
          <h3 class="text-lg! font-bold!">风险描述</h3>
          <p class="right-white-box w-[80%]! bg-white! rounded-lg! mt-3!">
            {{ aiEmotionAnalysis?.riskDescription ?? '-' }}
          </p>
        </div>
      </div>
      <!-- 改善建议 -->
      <div class="bg-gray-100! p-4! rounded-lg! mt-6!">
        <h3 class="text-lg! font-bold!">改善建议</h3>
        <p class="right-white-box w-[80%]! bg-white! rounded-lg! mt-3!">
          {{ aiEmotionAnalysis?.improvementSuggestions?.join(',') ?? '-' }}
        </p>
      </div>
      <!-- 时间信息 -->
      <div class="mt-6!">
        <h3 class="text-lg! font-bold!">时间信息</h3>
        <div class="flex items-center mt-2!">
          <h4 class="left-gray-box">创建时间</h4>
          <span class="right-white-box w-[30%]!">{{
            emotionDiaryDialogInfo?.createdAt ?? '-'
          }}</span>
          <h4 class="left-gray-box">更新时间</h4>
          <span class="right-white-box w-[30%]!">{{
            emotionDiaryDialogInfo?.updatedAt ?? '-'
          }}</span>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { AiEmotionAnalysis, EmotionDiaryRecord } from '@/apis/emotions/type'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: boolean
  emotionDiaryDialogInfo?: EmotionDiaryRecord
}>()
const visible = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  },
})

// 解析 AI 情绪分析 JSON 字符串，供模板使用
const aiEmotionAnalysis = computed<AiEmotionAnalysis | null>(() => {
  const raw = props.emotionDiaryDialogInfo?.aiEmotionAnalysis
  if (!raw) return null
  try {
    return JSON.parse(raw) as AiEmotionAnalysis
  } catch {
    return null
  }
})
</script>

<style scoped lang="css">
.left-gray-box {
  border: 1px solid !important;
  font-size: 1rem !important; /* 或 16px，取决于 text-md 的定义 */
  font-weight: 700 !important;
  background-color: rgb(243 244 246) !important; /* gray-100 */
  border-color: rgb(209 213 219) !important; /* gray-300 */
  padding: 0.5rem !important; /* 8px */
  width: 20% !important;
  padding-left: 1rem !important; /* 16px */
}
.right-white-box {
  border: 1px solid #d1d5db !important;
  border-left: 0 !important;
  width: 20% !important;
  padding: 0.5rem !important;
  padding-left: 1rem !important;
  font-size: 1rem !important;
}
</style>
