<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import InputLabel from '../../components/InputLabel.vue'
import TextInput from '../../components/TextInput.vue'
import InputError from '../../components/InputError.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import Multiselect from 'vue-multiselect'
import { onMounted, ref, reactive, inject } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const validation = ref([])
const swal = inject('swal')
const roles = ref([])
const user = reactive({
  name: null,
  username: null,
  email: null,
  password: null,
  role: ''
})

onMounted(() => {
  axios
    .get('role', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res)
      roles.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
})

const send = () => {
  axios
    .post(
      'register',
      {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        role_id: user.role.id
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
        text: 'Tambah pengguna berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      return router.push({
        name: 'user.index'
      })
    })
    .catch((err) => {
      if (err.response.status == 400) {
        validation.value = err.response.data.errors
      }
    })
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
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">Tambah Pengguna</h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <div class="whitespace-nowrap">
          <form @submit.prevent="send()" class="space-y-4">
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
              <InputLabel>Password</InputLabel>
              <TextInput
                class="mt-1 block w-full"
                type="password"
                v-model="user.password"
                autofocus
              />
              <InputError v-if="validation.password" :message="validation.password._errors[0]" />
            </div>
            <div>
              <InputLabel>Hak Akses</InputLabel>
              <multiselect
                v-model="user.role"
                :options="roles"
                :custom-label="nameWithLang"
                placeholder="Select one"
                label="name"
                track-by="name"
              ></multiselect>
              <InputError v-if="validation.role_id" :message="validation.role_id._errors[0]" />
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
