<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import InputLabel from '@/components/InputLabel.vue'
import Multiselect from 'vue-multiselect'
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'

const users = ref([])
const role = ref(4) //role guru pamong

const accommodate = reactive({
  user: ''
})

onMounted(() => {
  axios
    .get(`users/${role.value}/role`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res)
      users.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
})

const send = () => {
  console.log(accommodate)
}

const nameWithLang = ({ name }) => {
  return `${name}`
}
</script>
<template>
  <AuthLayout>
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">Tambah Guru Pamong</h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md">
        <div class="whitespace-nowrap">
          <form @submit.prevent="send()" class="space-y-4">
            <div>
              <InputLabel>Guru Pamong</InputLabel>
              <multiselect
                v-model="accommodate.user"
                :options="users"
                :custom-label="nameWithLang"
                placeholder="Select one"
                label="name"
                track-by="name"
              ></multiselect>
            </div>
            <div>
              <PrimaryButton type="submit">Simpan</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>
