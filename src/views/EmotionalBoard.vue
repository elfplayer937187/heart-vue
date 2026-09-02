<template>
  <el-card>
    <PageHead title="情绪日志" />
    <TableSearch class="mt-4!" :FormItem="FormItem" @search="handleSearch" @reset="handleReset" />
    <el-table :data="emotionTableData ?? []" class="mt-4! mb-4!" style="width: 100%">
      <el-table-column label="用户姓名" prop="userId" width="90px" align="center" fixed="left">
        <template #default="{ row }">
          <div
            class="flex items-center justify-center bg-gray-300! rounded-full w-15 h-15 mx-auto overflow-hidden"
          >
            <span class="text-sm! text-center">{{ row.username }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户id" prop="userId" width="120px" align="center" fixed="left">
        <template #default="{ row }">
          <span class="font-medium">{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="记录日期" prop="recordDate" width="140px" align="center">
        <template #default="{ row }">
          {{ row.diaryDate }}
        </template>
      </el-table-column>
      <el-table-column label="情绪评分" prop="emotionScore" min-width="180px" align="center">
        <template #default="{ row }">
          <el-rate :model-value="row.moodScore" :max="10" disabled size="small" />
          <span class="ml-2! text-sm! text-gray-500! font-bold! italic!">{{ row.moodScore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生活指标" prop="lifeIndex" min-width="120px">
        <template #default="{ row }">
          <span class="text-gray-600! text-sm!">{{ row.dominantEmotion }}</span>
        </template>
      </el-table-column>
      <el-table-column label="情绪触发因素" prop="trigger" min-width="150px">
        <template #default="{ row }">
          <span class="line-clamp-1 text-gray-500! text-sm!">{{ row.emotionTriggers }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日记内容" prop="content" min-width="220px">
        <template #default="{ row }">
          <span class="line-clamp-2 text-gray-500! text-sm!">{{ row.diaryContent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240px" align="center" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            icon="View"
            @click="handleView(row)"
            class="bg-blue-400! border-blue-400! hover:bg-blue-500! hover:border-blue-500!"
          >
            查看
          </el-button>
          <el-button
            type="danger"
            icon="Delete"
            @click="handleDelete(row)"
            class="bg-red-400! border-red-400! hover:bg-red-500! hover:border-red-500!"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="emotionDiaryParams.current"
      v-model:page-size="emotionDiaryParams.size"
      :page-sizes="[3, 5, 7, 9]"
      layout="total, sizes, prev, pager,  next, jumper"
      :total="total"
      @change="handlePaginationChange"
    >
    </el-pagination>
  </el-card>
  <EmotionDiary
    v-model:modelValue="emotionDiaryDialogVisible"
    :emotionDiaryDialogInfo="emotionDiaryDialogInfo"
  />
</template>

<script lang="ts" setup>
import EmotionDiary from '@/components/EmotionDiary.vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import type { FormItemType } from './KowledgeBoard.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { deleteEmotionDiary, getEmotionList } from '@/apis/emotions/emotion.ts'
import type { EmotionDiaryRecord, EmotionDiaryReq } from '@/apis/emotions/type.ts'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/css'
// dialog展示信息
const emotionDiaryDialogInfo = ref<EmotionDiaryRecord>()
// 情绪日记详情弹窗
const emotionDiaryDialogVisible = ref(false)
// 总条数
const total = ref<number>(0)
// 列表数据
const emotionTableData = ref<EmotionDiaryRecord[]>()
const emotionDiaryParams = reactive<EmotionDiaryReq>({
  current: 1,

  dominantEmotion: '',

  maxMoodScore: 10,

  minMoodScore: 1,

  size: 3,

  userId: '',
})
const initPagination = async () => {
  const res = await getEmotionList(emotionDiaryParams)
  if (res.code.toString() === '200') {
    console.log(res.data, 'res.data')

    emotionTableData.value = res.data?.records
    total.value = res.data?.total ?? 0
  }
}
onMounted(initPagination)
const FormItem = computed<FormItemType[]>(() => [
  {
    component: 'input',
    prop: 'userId',
    label: '用户ID',
    placeholder: '请输入',
  },
  {
    component: 'select',
    prop: 'emotionScore',
    label: '情绪评分',
    placeholder: '请输入',
    options: [
      {
        label: '低分（1-3）',
        value: '1-3',
      },
      {
        label: '中分（4-6）',
        value: '4-6',
      },
      {
        label: '高分（7-10）',
        value: '7-10',
      },
    ],
  },
])

// 重置
const handleReset = () => {
  emotionDiaryParams.userId = ''
  emotionDiaryParams.minMoodScore = 1
  emotionDiaryParams.maxMoodScore = 10
  initPagination()
}
// 查看详情
const handleView = (row: EmotionDiaryRecord) => {
  emotionDiaryDialogVisible.value = true
  emotionDiaryDialogInfo.value = row
}
// 删除
const handleDelete = (row: EmotionDiaryRecord) => {
  ElMessageBox.confirm('确定删除该记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await deleteEmotionDiary(row.id.toString())
    if (res.code.toString() === '200') {
      ElMessage.success('删除成功')
      initPagination()
    } else {
      ElMessage({
        message: res.message,
        type: 'error',
      })
    }
  })
}
// 处理分页列表变化
const handlePaginationChange = () => {
  initPagination()
}
// 处理搜索
const handleSearch = (FormData: { emotionScore: string; userId: string }) => {
  emotionDiaryParams.userId = FormData.userId || ''
  ;[emotionDiaryParams.minMoodScore, emotionDiaryParams.maxMoodScore] = FormData.emotionScore
    .split('-')
    .map((item) => Number(item)) || [0, 0]
  console.log(emotionDiaryParams, 'emotionDiaryParams')

  initPagination()
}
</script>

<style scoped lang="scss"></style>
