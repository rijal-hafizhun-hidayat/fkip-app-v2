<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import { userAuthStore } from '@/stores/auth'

const auth = userAuthStore()
auth.user.name = sessionStorage.getItem('name')
</script>

<template>
  <AuthLayout>
    <template #header>
      <div class="flex justify-between">
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2></div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <p>selamat datang {{ auth.user.name }}</p>
      </div>
    </div>
  </AuthLayout>
</template>
