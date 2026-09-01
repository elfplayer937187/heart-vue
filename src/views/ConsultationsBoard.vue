<template>
  <el-card class="px-3!">
    <PageHead title="咨询记录" />
    <el-table :data="pagedData" style="width: 100%" class="mt-4! mb-4!">
      <el-table-column label="用户昵称" prop="userNickname" width="150px">
        <template #default="{ row }">
          <div
            class="flex items-center justify-center bg-gray-300! rounded-full w-15 h-15 mx-auto overflow-hidden"
          >
            <span class="text-sm! text-center">{{ row.userNickname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="情绪日志" prop="emotionLog" min-width="50%">
        <template #default="{ row }">
          <div class="font-bold! text-sm! mb-2!">{{ row.sessionTitle }}</div>
          <span class="line-clamp-1 text-gray-500! text-sm!">{{ row.lastMessageContent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消息数" prop="messageCount" width="90px" align="center">
        <template #default="{ row }">
          <span class="font-medium">{{ row.messageCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="time" width="170px" align="center">
        <template #default="{ row }">
          {{ row.lastMessageTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px" align="center" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            @click="handleView(row)"
            icon="View"
            class="bg-blue-400! border-blue-400! hover:bg-blue-500! hover:border-blue-500!"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="paginationRequestParams.currentPage"
      v-model:page-size="paginationRequestParams.size"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager,->, next, jumper"
      :total="total"
      @change="handleChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { getSessions } from '@/apis/consultations/consultation'
import type { Session, SessionRequest } from '@/apis/consultations/type'
import PageHead from '@/components/PageHead.vue'
import { onMounted, reactive, ref } from 'vue'
// 总页数
const total = ref(0)
// 分页请求参数
const paginationRequestParams = reactive<SessionRequest>({
  currentPage: 1,
  size: 10,
})
// 分页数据
const pagedData = ref<Session[]>([])
const initPaginationData = async () => {
  const res = await getSessions({
    currentPage: paginationRequestParams.currentPage.toString(),
    size: paginationRequestParams.size.toString(),
  })
  if (res.code.toString() === '200') {
    pagedData.value = res.data?.records || []
    // 总页数
    total.value = res.data?.total || 0
  }
}
onMounted(() => {
  initPaginationData()
})
const handleChange = () => {
  initPaginationData()
}
const handleView = (row: Session) => {
  console.log(row)
}
</script>

<style scoped lang="scss"></style>
