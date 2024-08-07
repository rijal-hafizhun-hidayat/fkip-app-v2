<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  axios
    .get(`accommodate/colleger/${route.params.accommodateId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>
<template>
  <AuthLayout>
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">Ubah hubungan mahasiswa</h2>
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
