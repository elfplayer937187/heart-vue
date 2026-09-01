<template>
  <div class=" ">
    <el-form ref="FormRef" :model="FormData">
      <!-- 占一整行 -->
      <el-row :gutter="24">
        <template v-for="item in NewFormItems" :key="item.prop">
          <el-col v-bind="item.col">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- 动态渲染组件 -->
              <component
                :is="TransformToComponent(item.component as string)"
                :placeholder="item.placeholder"
                v-model="FormData[item.prop]"
                @keyup.enter="HandleSearch"
              >
                <!-- 如果组件是select，则显示下拉框 -->
                <template v-if="item.component === 'select'">
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </template>
              </component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <el-row class="flex mt-4!">
        <!-- 搜索和重置按钮（右侧） -->
        <div>
          <el-button type="primary" @click="HandleSearch">搜索</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import type { FormItemType } from '@/views/KowledgeBoard.vue'
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'

// 定义事件
const $emit = defineEmits(['search', 'reset'])

// 获取表单实例
const FormRef = ref<FormInstance>()
// 获取表单数据
const props = defineProps<{
  FormItem: FormItemType[]
}>()
const NewFormItems = computed(() => {
  const { FormItem } = props
  FormItem.forEach((item) => (item.col = { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }))
  return FormItem
})
// 表单数据:按每个表单项的 prop 初始化空值
const FormData = reactive(Object.fromEntries(props.FormItem.map((item) => [item.prop, ''])))
// 转换组件
const TransformToComponent = (name: string) => {
  return (
    {
      input: 'el-input',
      select: 'el-select',
    }[name] || 'el-input'
  )
}
// 重置表单
const resetForm = () => {
  if (!FormRef.value) return
  FormRef.value?.resetFields()
  $emit('reset')
}
// 搜索表单:把表单数据一起发出去
const HandleSearch = () => {
  $emit('search', FormData)
}
</script>

<style scoped lang="scss"></style>
