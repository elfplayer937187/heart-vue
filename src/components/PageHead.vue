<template>
  <div class="flex items-center justify-between">
    <h1>{{ title ?? '无标题' }}</h1>
    <slot name="button"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss"></style>
