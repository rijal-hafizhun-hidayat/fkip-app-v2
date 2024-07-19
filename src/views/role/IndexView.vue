<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import { onMounted, ref, inject } from 'vue'
import axios from 'axios'
import DangerButton from '../../components/DangerButton.vue'
import WarningButton from '../../components/WarningButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const roles = ref([])
const moment = inject('moment')
const swal = inject('swal')

onMounted(() => {
  getRole()
})

const getRole = () => {
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

const destroyRoleById = (id) => {
  axios
    .delete(`role/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(() => {
      swal.fire({
        title: 'Success',
        text: 'Hapus role berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      getRole()
    })
    .catch((err) => {
      console.log(err)
    })
}

const showById = (roleId) => {
  return router.push({
    name: 'role.show',
    params: {
      id: roleId
    }
  })
}
</script>

<template>
  <AuthLayout>
    <template #header>
      <div class="flex justify-between">
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Role</h2></div>
        <div>
          <router-link
            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            :to="{ name: 'role.create' }"
            >Tambah</router-link
          >
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <table class="w-full whitespace-nowrap">
          <thead>
            <tr class="text-left font-bold">
              <th class="pb-4 pt-6 px-6">#</th>
              <th class="pb-4 pt-6 px-6">Nama</th>
              <th class="pb-4 pt-6 px-6">Dibuat</th>
              <th class="pb-4 pt-6 px-6">Diubah</th>
              <th class="pb-4 pt-6 px-6">Aksi</th>
            </tr>
          </thead>
          <tbody v-if="roles.length !== 0">
            <tr v-for="(role, index) in roles" :key="role.id" class="hover:bg-gray-100">
              <td class="border-t items-center px-6 py-4">
                {{ index + 1 }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ role.name }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ moment(role.created_at).format('DD MMMM YYYY') }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ moment(role.updated_at).format('DD MMMM YYYY') }}
              </td>
              <td class="border-t items-center px-6 py-4">
                <div class="space-x-4">
                  <WarningButton @click="showById(role.id)">Ubah</WarningButton>
                  <DangerButton @click="destroyRoleById(role.id)">Hapus</DangerButton>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <td class="py-4 text-center border-t" colspan="5">No data found.</td>
          </tbody>
        </table>
      </div>
    </div>
  </AuthLayout>
</template>
