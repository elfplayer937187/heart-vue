<template>
  <div class="w-full max-w-100">
    <el-card
      shadow="never"
      :body-style="{ padding: '32px 28px' }"
      class="rounded-lg border-none! shadow-[0_6px_24px_rgba(0,0,0,0.08)] [--el-form-label-font-color:#4b5563]"
    >
      <div class="flex flex-col items-center justify-center">
        <h2 class="text-2xl font-bold mb-3 text-center">请登录您的账户</h2>
        <p class="text-sm text-gray-500 mb-8">请输入您的账号和密码</p>
      </div>
      <div>
        <el-form :model="form" label-position="top" :rules="rules">
          <el-form-item
            prop="username"
            label="账号"
            class="mb-5! [--el-input-focus-border-color:#4a9c8c]"
          >
            <el-input placeholder="请输入您的账号" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
            class="mb-5! [--el-input-focus-border-color:green]"
          >
            <el-input
              placeholder="请输入您的密码"
              v-model="form.password"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item class="mt-7! mb-0!">
            <el-button
              type="primary"
              class="w-full h-10 rounded-md text-base tracking-widest [--el-button-bg-color:#4a9c8c] [--el-button-border-color:#4a9c8c] [--el-button-hover-bg-color:#3d8a7a] [--el-button-hover-border-color:#3d8a7a] [--el-button-active-bg-color:#357565] [--el-button-active-border-color:#357565]"
              :loading="loading"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormRules } from 'element-plus'
// 表单数据
const form = ref({
  username: '',
  password: '',
})
// 登录按钮的加载状态
const loading = ref(false)
// 表单验证
const validateUsername = (rule: any, value: any, callback: any) => {
  if (!value.trim()) {
    callback(new Error('请输入您的账号'))
    return
  }
  if (value.includes(' ') && !/'\[0-9a-zA-Z]+'/.test(value)) {
    callback(new Error('请输入数字和字母'))
    return
  }
  if (value.length <= 2 || value.length >= 10) {
    callback(new Error('请输入2-10位账号'))
    return
  }
  callback()
}
// 表单验证
const validatePassword = (rule: any, value: any, callback: any) => {
  if (!value.trim()) {
    callback(new Error('请输入您的密码'))
    return
  }
  if (value.includes(' ') && !/'\[0-9a-zA-Z]+'/.test(value)) {
    callback(new Error('请输入数字和字母'))
    return
  }
  if (value.length < 6 || value.length > 16) {
    callback(new Error('请输入6-16位密码'))
    return
  }
  callback()
}
// 表单验证规则
const rules = ref<FormRules<typeof form.value>>({
  username: [{ trigger: 'change', validator: validateUsername }],
  password: [{ trigger: 'change', validator: validatePassword }],
})

// 登录逻辑
const login = () => {
  loading.value = true
  // TODO: 接入真实登录逻辑
  setTimeout(() => {
    loading.value = false
    console.log(form.value)
  }, 800)
}
</script>
