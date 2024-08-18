<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import { onMounted } from 'vue'

onMounted(() => {
  console.log(true)
})
</script>
<template>
  <AuthLayout>
    <template #header>
      <div class="flex justify-between">
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Bimbingan</h2></div>
        <div>
          <router-link
            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            :to="{ name: 'user.guidance.create' }"
            >Tambah</router-link
          >
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
