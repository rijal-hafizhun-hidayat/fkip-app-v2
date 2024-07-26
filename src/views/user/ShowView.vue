<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import InputLabel from '../../components/InputLabel.vue'
import TextInput from '../../components/TextInput.vue'
import InputError from '../../components/InputError.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import Multiselect from 'vue-multiselect'
import { onMounted, ref, reactive, inject } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const validation = ref([])
const swal = inject('swal')
const roles = ref([])
const user = reactive({
  name: null,
  username: null,
  email: null,
  role: ''
})

onMounted(() => {
  getUserById()
  getRoles()
})

const getUserById = () => {
  axios
    .get(`users/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res)
      user.name = res.data.data.name
      user.username = res.data.data.username
      user.email = res.data.data.email
      user.role = res.data.data.roles[0].role
    })
    .catch((err) => {
      console.log(err)
    })
}

const getRoles = () => {
  axios
    .get('role', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      roles.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const send = () => {
  axios
    .put(
      `users/${route.params.id}`,
      {
        name: user.name,
        username: user.username,
        email: user.email,
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
        text: 'Ubah pengguna berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      return router.push({
        name: 'user.index'
      })
    })
    .catch((err) => {
      console.log(err)
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
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">Ubah Pengguna</h2>
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
