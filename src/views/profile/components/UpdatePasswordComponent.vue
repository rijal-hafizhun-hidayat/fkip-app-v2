<script setup>
import InputLabel from '@/components/InputLabel.vue'
import InputError from '@/components/InputError.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import TextInput from '@/components/TextInput.vue'
import { ref, reactive, inject } from 'vue'
import axios from 'axios'

const swal = inject('swal')
const validation = ref([])
const user = reactive({
  password: null
})

const updatePassword = () => {
  axios
    .put(
      'me/update-password',
      {
        password: user.password
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )
    .then(() => {
      swal.fire({
        title: 'Success',
        text: 'Ubah password berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    })
    .catch((err) => {
      if (err.response.status == 400) {
        validation.value = err.response.data.errors
      }
    })
}
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md">
      <h1 class="font-bold py-2 text-xl">Ubah Password</h1>
      <div class="whitespace-nowrap">
        <form @submit.prevent="updatePassword()" class="space-y-4">
          <div>
            <InputLabel>Password Baru</InputLabel>
            <TextInput class="mt-1 block w-full" type="password" v-model="user.password" />
            <InputError v-if="validation.password" :message="validation.password._errors[0]" />
          </div>
          <div>
            <PrimaryButton type="submit">Simpan</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
