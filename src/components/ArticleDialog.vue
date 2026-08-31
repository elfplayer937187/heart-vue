<template>
  <el-dialog
    v-model="dialogVisible"
    width="50%"
    :title="isEdit ? '编辑文章' : '新增文章'"
    @close="handleClose"
  >
    <el-form :model="formData" :rules="rules" label-width="auto" ref="formRef">
      <el-form-item label="文章标题" prop="title" maxlength="100" show-word-limit>
        <el-input
          v-model.trim="formData.title"
          placeholder="请输入文章标题"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="请选择分类">
          <el-option
            v-for="item in props.categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文章摘要" prop="summary">
        <el-input
          type="textarea"
          v-model="formData.summary"
          placeholder="请输入文章摘要(可选)"
          maxlength="1000"
          show-word-limit
          :rows="4"
        />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select
          v-model="formData.tags"
          placeholder="请输入文章标签(逗号分隔)"
          multiple
          filterable
          allow-create
          style="width: 100%"
        >
          <el-option v-for="tag in commonTags" :key="tag" :label="tag" :value="tag" />
        </el-select>
      </el-form-item>
      <el-form-item label="上传图片">
        <div class="flex flex-col items-center justify-center">
          <el-upload
            class="avatar-uploader"
            action="#"
            :http-request="handleImageUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <template v-if="imageUrl">
              <img
                :src="imageUrl"
                class="avatar shadow-2xl"
                width="178px"
                height="178px"
                object-fit="cover"
              />
            </template>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <el-button v-if="imageUrl" type="danger" @click="HandleClearImage">删除图片</el-button>
        </div>
      </el-form-item>
      <el-form-item label="富文本编辑" prop="content">
        <RichTextEditor
          v-model="formData.content"
          @change="handleContentChange"
          @created="handleEditorCreated"
          placeholder="请输入文章内容"
          :maxCharCount="5000"
          :showWordCount="true"
          :showSecurityTip="true"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">创建文章</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, type PropType, nextTick } from 'vue'
import { beforeUpload } from '@/utils/imageLoad'
import { addKnowledgeArticle, uploadImage } from '@/apis/knowledge'
import { ElMessage, type FormInstance } from 'element-plus'
import 'element-plus/dist/index.css'
import { IMAGE_UPLOAD_URL } from '@/config/config'
import RichTextEditor from './RichTextEditor.vue'
import type { IDomEditor } from '@wangeditor/editor'
// 表单ref
const formRef = ref<FormInstance>()
// 图片地址
const imageUrl = ref<string>('')
// 表单数据
const formData = reactive<{
  title: string
  content: string
  coverImage: string
  categoryId: string
  summary: string
  tags: string[]
  id: string
}>({
  title: '',
  content: '',
  coverImage: '',
  categoryId: '',
  summary: '',
  tags: [],
  id: '',
})
// 公共标签
const commonTags = [
  '情绪管理',
  '焦虑',
  '抑郁',
  '压力',
  '睡眠',
  '冥想',
  '正念',
  '放松',
  '心理健康',
  '自我成长',
  '人际关系',
  '工作压力',
  '学习方法',
  '生活技巧',
]
// 增添文章加载状态
const loading = ref(false)
const props = defineProps({
  // 弹窗显示还是隐藏
  modelValue: {
    type: Boolean,
    default: false,
  },
  // 文章内容
  articleContent: {
    type: Object,
    default: null,
  },
  // 分类选项
  categories: {
    type: Array as PropType<{ label: string; value: string }[]>,
    default: () => [],
  },
})
const emit = defineEmits(['update:modelValue', 'success'])

// 根据props.modelValue的值来决定弹窗的显示还是隐藏
const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
const isEdit = computed(() => (!!props.articleContent?.id ? true : false))
// 富文本编辑器实例
const editorRef = ref<IDomEditor | null>(null)
// 关闭弹窗
const handleClose = () => {
  formRef.value?.resetFields()
  imageUrl.value = ''
  dialogVisible.value = false
}
// 处理图片上传
const handleImageUpload = async ({ file }: { file: File }) => {
  // UUID生成
  const uuId = crypto.randomUUID()
  const res = await uploadImage(file, uuId)
  if (res.code.toString() === '200') {
    imageUrl.value = IMAGE_UPLOAD_URL + (res.data?.filePath || '')
    formData.coverImage = res.data?.filePath || ''
    ElMessage({
      type: 'success',
      message: '图片上传成功',
    })
  }
}
const HandleClearImage = () => {
  imageUrl.value = ''
  formData.coverImage = ''
}
const handleContentChange = (content: { html: string; text: string }) => {
  formData.content = content.html
}
// 富文本编辑器创建
const handleEditorCreated = (editor: IDomEditor) => {
  editorRef.value = editor
  // 编辑
  if (formData.content && editorRef.value) {
    nextTick(() => {
      editorRef.value?.setHtml(formData.content)
    })
  }
}
// 表单校验规程
const rules = reactive({
  title: [{ required: true, message: '请输入文章标题', trigger: 'change' }],
  categoryId: [{ required: true, message: '请选择分类', trigger: 'change' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'change' }],
})
// 提交文章
const handleSubmit = async () => {
  loading.value = true
  try {
    await formRef.value?.validate()
    // 调用api
    const res = await addKnowledgeArticle({
      ...formData,
      tags: formData.tags.join(','),
    })

    if (res.code.toString() === '200') {
      handleClose()
      emit('success')
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.avatar-uploader :deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader :deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
