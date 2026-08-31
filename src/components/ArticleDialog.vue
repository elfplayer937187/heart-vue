<template>
  <el-dialog
    v-model="dialogVisible"
    width="50%"
    :title="isEdit ? '编辑文章' : '新增文章'"
    @close="handleClose"
  >
    <el-form :model="formData" label-width="auto">
      <el-form-item label="文章标题" prop="title" maxlength="100" show-word-limit>
        <el-input v-model="formData.title" placeholder="请输入文章标题" />
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
        <!-- <el-upload
          class="avatar-uploader"
          action="/api/file/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload> -->
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, type PropType } from 'vue'
// import { getToken } from '@/utils/token'
// token
// const token = getToken()
// 表单数据
const formData = reactive({
  title: '',
  content: '',
  coverImage: '',
  categoryId: '',
  summary: '',
  tags: [] as string[],
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
const handleClose = () => {
  dialogVisible.value = false
}
</script>

<style scoped lang="scss"></style>
