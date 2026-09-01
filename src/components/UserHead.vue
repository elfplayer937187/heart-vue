<template>
  <div
    class="flex items-center justify-center bg-gray-300! rounded-full w-15 h-15 mx-auto overflow-hidden"
  >
    <span class="text-sm! text-center">{{ userNickname ?? 'UnKnown' }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  userNickname: string
}>()
</script>

<style scoped lang="scss"></style>
