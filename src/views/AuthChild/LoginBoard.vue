<template>
  <div>
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold mb-4 text-center">请登录您的账户</h2>
      <p class="text-sm text-gray-500 mb-4">请输入您的账号和密码</p>
    </div>
    <div>
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入您的账号" label="账号" label-width="100px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入您的密码" label="密码" label-width="100px"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss"></style>
