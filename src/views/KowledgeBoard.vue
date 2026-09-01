<template>
  <el-card class="px-3! pl-6!">
    <PageHead title="知识文章">
      <template #button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </template>
    </PageHead>
    <TableSearch :FormItem="FormItem as any" class="mt-4!" @search="handleSearch"></TableSearch>
    <el-table :data="articalList" style="width: 90%" border class="mt-4! mb-4!">
      <el-table-column label="文章标题" prop="title" width="300px" align="center" fixed="left">
        <template #default="{ row }">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="categoryName" width="150px" align="center">
        <template #default="{ row }">
          {{ row.categoryName }}
        </template>
      </el-table-column>
      <el-table-column label="作者" prop="authorName" width="150px" align="center">
        <template #default="{ row }">
          {{ row.authorName }}
        </template>
      </el-table-column>
      <el-table-column label="阅读量" prop="readCount" width="120px" align="center">
        <template #default="{ row }">
          {{ row.readCount }}
        </template>
      </el-table-column>
      <el-table-column label="发布时间" prop="publishedAt" width="200px" align="center">
        <template #default="{ row }">
          {{ row.publishedAt }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px" align="center" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            @click="handleEdit(row)"
            icon="Edit"
            class="bg-blue-400! border-blue-400! hover:bg-blue-500! hover:border-blue-500!"
            >编辑</el-button
          >
          <el-button
            type="primary"
            @click="handleDelete(row)"
            icon="Delete"
            class="bg-red-400! border-red-400! hover:bg-red-500! hover:border-red-500!"
            >删除</el-button
          >
          <el-button
            type="primary"
            @click="handleUpShelf(row)"
            :icon="row.status === 1 ? 'Download' : 'Upload'"
            :class="
              row.status === 1
                ? 'bg-yellow-400! border-yellow-400! hover:bg-yellow-500! hover:border-yellow-500!'
                : 'bg-green-400! border-green-400! hover:bg-green-500! hover:border-green-500!'
            "
          >
            {{ row.status === 1 ? '下架' : '上架' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="articalListParams.currentPage"
      v-model:page-size="articalListParams.size"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager,->, next, jumper"
      :total="total"
      @change="handleChange"
    />
  </el-card>
  <ArticleDialog
    ref="articleDialogRef"
    v-model="articleDialogVisible"
    :articleContent="articleContent"
    :categories="categoryList"
    @success="handleSuccess"
  />
</template>

<script lang="ts" setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { onMounted } from 'vue'
import {
  getKnowledgeCategoryList,
  getKnowledgeArticleList,
  updateKnowledgeArticleStatus,
  deleteKnowledgeArticle,
  getKnowledgeArticleDetail,
} from '@/apis/knowledge'
import type {
  KnowledgeArticleListRequestType,
  KnowledgeArticleItemType,
  KnowledgeArticleStatusType,
} from '@/apis/knowledge/type'
import ArticleDialog from '@/components/ArticleDialog.vue'
import { ref, computed, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'
// 文章对话框ref
const articleDialogRef = ref<InstanceType<typeof ArticleDialog>>()
// 文章内容
const articleContent = ref<KnowledgeArticleStatusType>()
// 设置dialog是否可见
const articleDialogVisible = ref(false)
// 文章分类
const categoryList = ref<{ label: string; value: string }[]>([])

// 知识文章列表数据
const articalList = ref<KnowledgeArticleItemType[]>([])
const total = ref(0)
// 知识文章列表请求参数
const articalListParams = reactive<KnowledgeArticleListRequestType>({
  currentPage: '1',
  size: '10',
  title: '',
  categoryId: '',
  status: '',
  authorName: '',
})
onMounted(async () => {
  init()
})
// 处理搜索:拿到 TableSearch 传来的表单值
const handleSearch = async (data: Record<string, string>) => {
  articalListParams.title = data.title || ''
  // 表单里下拉框的 prop 是 'category',所以从 data.category 取值
  articalListParams.categoryId = data.category || ''
  articalListParams.status = data.status || ''
  // 搜索时回到第一页
  articalListParams.currentPage = '1'
  const articalListRes = await getKnowledgeArticleList(articalListParams)
  // 把结果写回表格
  articalList.value = articalListRes.data?.records || []
  total.value = articalListRes.data?.total || 0
}
export interface FormItemType {
  component: string
  placeholder?: string
  prop: string
  label: string
  col?: Record<string, number>
  options?: {
    label: string
    value: string
  }[]
}
const FormItem = computed<FormItemType[]>(() => [
  {
    component: 'input',
    prop: 'title',
    label: '文章标题',
    placeholder: '请输入',
  },
  {
    component: 'select',
    prop: 'category',
    label: '文章分类',
    placeholder: '请选择',
    options: categoryList.value,
  },
  {
    component: 'select',
    prop: 'status',
    label: '状态',
    placeholder: '请选择',
    options: [
      { label: '草稿', value: '0' },
      { label: '已发布', value: '1' },
      { label: '已下线', value: '2' },
    ],
  },
])
const handleChange = () => {
  init()
}
// 初始化获取数据
const init = async () => {
  try {
    // 获取文章分类
    const res = await getKnowledgeCategoryList()
    const articalListRes = await getKnowledgeArticleList(articalListParams)
    articalList.value = articalListRes.data?.records || []
    total.value = articalListRes.data?.total || 0
    // 处理文章分类
    categoryList.value =
      res.data?.map((item) => ({
        label: item.categoryName,
        value: item.id.toString(),
      })) || []
  } catch (error) {
    console.log(error)
  }
}
const handleEdit = async (row: KnowledgeArticleItemType) => {
  const res = await getKnowledgeArticleDetail(row.id)
  if (res.code.toString() === '200') {
    console.log('res.data', res.data)
    articleContent.value = res.data
    articleDialogVisible.value = true
    articleDialogRef.value?.initFormData()
  }
}
const handleDelete = async (row: KnowledgeArticleItemType) => {
  await ElMessageBox.confirm('确定删除该文章吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const res = await deleteKnowledgeArticle(row.id)
  if (res.code.toString() === '200') {
    ElMessage({
      type: 'success',
      message: '文章删除成功',
    })
    init()
  }
}
const handleUpShelf = async (row: KnowledgeArticleItemType) => {
  const res = await updateKnowledgeArticleStatus(row.id, row.status === 1 ? '2' : '1')
  if (res.code.toString() === '200') {
    ElMessage({
      type: 'success',
      message: row.status === 1 ? '文章下架成功' : '文章上架成功',
    })
    init()
  }
}
const handleAdd = () => {
  articleDialogVisible.value = true
}
const handleSuccess = () => {
  ElMessage({
    type: 'success',
    message: '文章创建成功',
  })

  init()
}
</script>

<style scoped lang="scss"></style>
