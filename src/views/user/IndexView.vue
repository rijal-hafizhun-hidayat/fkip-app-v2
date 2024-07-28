<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import DangerButton from '../../components/DangerButton.vue'
import WarningButton from '../../components/WarningButton.vue'
import TextInput from '../../components/TextInput.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import Multiselect from 'vue-multiselect'
import { onMounted, ref, reactive, inject } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref([])
const roles = ref([])
const page = ref(1)
const moment = inject('moment')
const swal = inject('swal')
const search = reactive({
  query: '',
  role: ''
})

onMounted(() => {
  getUsers()
  getRoles()
})

const getUsers = () => {
  axios
    .get('users', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      params: {
        page: page.value,
        search: search.query,
        role_id: search.role.id ?? ''
      }
    })
    .then((res) => {
      console.log(res)
      users.value = res.data.data
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

const searchUsers = () => {
  axios
    .get('users', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      params: {
        page: page.value,
        search: search.query,
        role_id: search.role.id
      }
    })
    .then((res) => {
      users.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const showUserById = (userId) => {
  return router.push({
    name: 'user.show',
    params: {
      id: userId
    }
  })
}

const destroyUserById = (userId) => {
  axios
    .delete(`users/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(() => {
      swal.fire({
        title: 'Success',
        text: 'Hapus pengguna berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      getUsers()
    })
    .catch((err) => {
      console.log(err)
    })
}

const detailUserById = (userId) => {
  return router.push({
    name: 'user.detail',
    params: {
      id: userId
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
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Pengguna</h2></div>
        <div>
          <router-link
            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            :to="{ name: 'user.create' }"
            >Tambah</router-link
          >
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md">
        <form @submit.prevent="searchUsers()">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <TextInput
                class="block w-full"
                type="text"
                v-model="search.query"
                placeholder="Cari pengguna berdasarkan nama dan email"
              ></TextInput>
            </div>
            <div>
              <multiselect
                v-model="search.role"
                :options="roles"
                :custom-label="nameWithLang"
                placeholder="Select one"
                label="name"
                track-by="name"
              ></multiselect>
            </div>
            <div>
              <PrimaryButton class="mt-1" type="submit">Cari</PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <table class="w-full whitespace-nowrap">
          <thead>
            <tr class="text-left font-bold">
              <th class="pb-4 pt-6 px-6">#</th>
              <th class="pb-4 pt-6 px-6">Nama</th>
              <th class="pb-4 pt-6 px-6">Email</th>
              <th class="pb-4 pt-6 px-6">Hak Akses</th>
              <th class="pb-4 pt-6 px-6">Dibuat</th>
              <th class="pb-4 pt-6 px-6">Diubah</th>
              <th class="pb-4 pt-6 px-6">Aksi</th>
            </tr>
          </thead>
          <tbody v-if="users.length !== 0">
            <tr v-for="(user, index) in users" :key="user.id" class="hover:bg-gray-100">
              <td class="border-t items-center px-6 py-4">
                {{ index + 1 }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ user.name }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ user.email }}
              </td>
              <td
                v-for="userRole in user.roles"
                :key="userRole.role.id"
                class="border-t items-center px-6 py-4"
              >
                {{ userRole.role.name }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ moment(user.created_at).format('DD MMMM YYYY') }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ moment(user.updated_at).format('DD MMMM YYYY') }}
              </td>
              <td class="border-t items-center px-6 py-4">
                <div class="space-x-4">
                  <PrimaryButton @click="detailUserById(user.id)">Detail</PrimaryButton>
                  <WarningButton @click="showUserById(user.id)">Ubah</WarningButton>
                  <DangerButton @click="destroyUserById(user.id)">Hapus</DangerButton>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <td class="py-4 text-center border-t" colspan="7">No data found.</td>
          </tbody>
        </table>
      </div>
    </div>
  </AuthLayout>
</template>
