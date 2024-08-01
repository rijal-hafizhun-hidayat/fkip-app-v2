<script setup>
import InputLabel from '@/components/InputLabel.vue'
import InputError from '@/components/InputError.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import TextInput from '@/components/TextInput.vue'
import { onMounted, ref, reactive, inject } from 'vue'
import axios from 'axios'

const swal = inject('swal')
const validation = ref([])
const user = reactive({
  name: null,
  email: null,
  username: null
})

onMounted(() => {
  getProfile()
})

const getProfile = () => {
  axios
    .get('/me', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      user.name = res.data.data.name
      user.username = res.data.data.username
      user.email = res.data.data.email
    })
    .catch((err) => {
      console.log(err)
    })
}

const updateProfile = () => {
  axios
    .put(
      'me',
      {
        name: user.name,
        email: user.email,
        username: user.username
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
        text: 'Ubah profile berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      getProfile()
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
      <div class="whitespace-nowrap">
        <form @submit.prevent="updateProfile()" class="space-y-4">
          <div>
            <InputLabel>Nama</InputLabel>
            <TextInput class="mt-1 block w-full" type="text" v-model="user.name" autofocus />
            <InputError v-if="validation.name" :message="validation.name._errors[0]" />
          </div>
          <div>
            <InputLabel>Username</InputLabel>
            <TextInput class="mt-1 block w-full" type="text" v-model="user.username" autofocus />
            <InputError v-if="validation.username" :message="validation.username._errors[0]" />
          </div>
          <div>
            <InputLabel>Email</InputLabel>
            <TextInput class="mt-1 block w-full" type="text" v-model="user.email" autofocus />
            <InputError v-if="validation.email" :message="validation.email._errors[0]" />
          </div>
          <div>
            <PrimaryButton type="submit">Simpan</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
