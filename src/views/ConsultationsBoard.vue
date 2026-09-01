<template>
  <el-card class="px-3!">
    <PageHead title="咨询记录" />
    <el-table :data="pagedData" style="width: 100%" class="mt-4! mb-4!">
      <el-table-column label="用户昵称" prop="userNickname" width="150px">
        <template #default="{ row }">
          <UserHead :user-nickname="row.userNickname" />
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
  <el-dialog v-model="diaglogVisible" title="咨询对话详情" width="70%">
    <div
      class="bg-gray-200! p-4! rounded-md! text-md! text-black! border! border-gray-300! gap-2! flex! flex-col!"
    >
      <p>用户：{{ dialogData.userNickname }}</p>
      <p>开始时间：{{ dialogData.startTime }}</p>
      <p>消息数：{{ dialogData.messageCount }}</p>
    </div>
    <div class="">
      <h2 class="text-lg! font-bold! my-2!">对话记录</h2>
      <div class="space-y-3! max-h-96! overflow-y-auto! pr-2! px-3!">
        <template v-if="dialogData.messages.length">
          <div
            v-for="msg in dialogData.messages"
            :key="msg.id"
            class="flex"
            :class="msg.senderType === 1 ? 'justify-start' : 'justify-end'"
          >
            <div
              class="max-w-[75%]! rounded-lg! px-3! py-2! shadow-sm! transition-all! duration-200! hover:scale-105! hover:shadow-lg!"
              :class="
                msg.senderType === 1
                  ? 'bg-sky-100! text-black! hover:bg-sky-200!'
                  : 'bg-pink-100! text-black! hover:bg-pink-200!'
              "
            >
              <div class="text-xs! font-bold! mb-1! flex! justify-between! gap-4!">
                <span>{{ msg.senderTypeDesc }}</span>
                <span class="font-normal! text-gray-500!">{{ msg.createdAt }}</span>
              </div>
              <p class="whitespace-pre-wrap! text-sm! wrap-break-word!">{{ msg.content }}</p>
            </div>
          </div>
        </template>
        <el-empty v-else description="暂无对话记录" />
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { getSessionMessages, getSessions } from '@/apis/consultations/consultation'
import UserHead from '@/components/UserHead.vue'
import type { AIMessage, Session, SessionRequest, UserMessage } from '@/apis/consultations/type'
import PageHead from '@/components/PageHead.vue'
import { onMounted, reactive, ref } from 'vue'
// dialog展示框
const dialogData = reactive({
  userNickname: '',
  startTime: '',
  messageCount: 0,
  messages: [] as (UserMessage | AIMessage)[],
})
// 对话框是否显示
const diaglogVisible = ref(false)
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
  console.log(res)

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
const handleView = async (row: Session) => {
  diaglogVisible.value = true
  // 头部数据获取
  dialogData.userNickname = row.userNickname
  dialogData.startTime = row.startedAt
  dialogData.messageCount = row.messageCount
  // 对话记录数据获取
  const res = await getSessionMessages(row.id.toString())
  if (res.code.toString() === '200') {
    dialogData.messages = res.data || []
  }
}
</script>

<style scoped lang="scss"></style>
