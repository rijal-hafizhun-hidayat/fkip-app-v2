<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import TableDplComponent from './components/TableDplComponent.vue'
import TableTutorTeacherComponent from './components/TableTutorTeacherComponent.vue'
import TableCollegerComponent from './components/TableCollegerComponent.vue'
import { useRoute } from 'vue-router'
import { onMounted, reactive, inject } from 'vue'
import axios from 'axios'

const route = useRoute()
const moment = inject('moment')
const user = reactive({
  email: '',
  name: '',
  created_at: '',
  updated_at: '',
  role: ''
})

onMounted(() => {
  getUserById()
})

const getUserById = () => {
  axios
    .get(`users/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      user.email = res.data.data.email
      user.name = res.data.data.name
      user.created_at = res.data.data.created_at
      user.updated_at = res.data.data.updated_at
      user.role = res.data.data.roles[0].role
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
<template>
  <AuthLayout>
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">Detail</h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <table class="w-full whitespace-nowrap">
          <tbody>
            <tr>
              <td>Nama</td>
              <td>:</td>
              <td>{{ user.name }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td>Dibuat</td>
              <td>:</td>
              <td>{{ moment(user.created_at).format('DD MMMM YYYY') }}</td>
            </tr>
            <tr>
              <td>Diubah</td>
              <td>:</td>
              <td>{{ moment(user.updated_at).format('DD MMMM YYYY') }}</td>
            </tr>
            <tr class="font-bold">
              <td>Hak Akses</td>
              <td>:</td>
              <td>{{ user.role.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="user.role.name !== 'admin'">
      <TableCollegerComponent v-if="user.role.name !== 'mahasiswa'" />
      <TableTutorTeacherComponent v-if="user.role.name !== 'guru pamong'" />
      <TableDplComponent v-if="user.role.name !== 'dpl'" />
    </div>
  </AuthLayout>
</template>
