<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import InputLabel from '../../components/InputLabel.vue'
import TextInput from '../../components/TextInput.vue'
import InputError from '../../components/InputError.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import { reactive, inject, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const validation = ref([])
const router = useRouter()
const swal = inject('swal')
const role = reactive({
  name: null
})

const send = () => {
  axios
    .post(
      'role',
      {
        name: role.name
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
        text: 'Tambah role berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      return router.push({
        name: 'role.index'
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
  <AuthLayout>
    <template #header>
      <div class="flex justify-between">
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Tambah Role</h2></div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <div class="whitespace-nowrap">
          <form @submit.prevent="send()" class="space-y-4">
            <div>
              <InputLabel>Nama Role</InputLabel>
              <TextInput class="mt-1 block w-full" type="text" v-model="role.name" autofocus />
              <InputError v-if="validation.name" :message="validation.name._errors[0]" />
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
