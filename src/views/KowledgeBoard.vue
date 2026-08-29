<template>
  <el-card>
    <PageHead title="知识文章">
      <template #button>
        <el-button type="primary">新增</el-button>
      </template>
    </PageHead>
    <TableSearch :FormItem="FormItem as any" class="mt-4!"></TableSearch>
  </el-card>
</template>

<script lang="ts" setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
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
const FormItem: FormItemType[] = [
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
    options: [
      { label: '分类1', value: '1' },
      { label: '分类2', value: '2' },
      { label: '分类3', value: '3' },
    ],
  },
]
</script>

<style scoped lang="scss"></style>
