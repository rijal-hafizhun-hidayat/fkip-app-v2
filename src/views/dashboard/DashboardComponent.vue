<script setup>
import { userAuthStore } from '@/stores/auth'

const auth = userAuthStore()
if (auth.user === null) {
  auth.user = auth.getCurrentAuth()
}
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p>selamat datang {{ auth.user.name }}</p>
  </div>
</template>
