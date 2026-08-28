<template>
  <div class="common-layout">
    <el-container>
      <el-header class="bg-pink-400 h-14!">Header</el-header>
      <el-container>
        <el-aside width="200px" class="bg-blue-700 h-screen">Aside</el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
