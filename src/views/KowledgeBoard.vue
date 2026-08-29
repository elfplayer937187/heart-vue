<template>
  <el-card>
    <PageHead title="知识文章">
      <template #button>
        <el-button type="primary">新增</el-button>
      </template>
    </PageHead>
    <TableSearch></TableSearch>
  </el-card>
</template>

<script lang="ts" setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
</script>

<style scoped lang="scss"></style>
