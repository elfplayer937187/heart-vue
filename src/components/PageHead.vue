<template>
  <div class="flex items-center justify-between border-b-1! border-gray-200! pb-4!">
    <h1 class="text-2xl font-bold">{{ title ?? '无标题' }}</h1>
    <slot name="button"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss"></style>
