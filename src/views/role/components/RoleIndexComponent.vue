<script setup>
import { onMounted, ref, inject } from 'vue'
import axios from 'axios'
import DangerButton from '../../../components/DangerButton.vue'
import WarningButton from '../../../components/WarningButton.vue'

const roles = ref([])
const moment = inject('moment')

onMounted(() => {
  getRole()
})

const getRole = () => {
  axios
    .get('api/role')
    .then((res) => {
      roles.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
<template>
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
                <WarningButton>Ubah</WarningButton>
                <DangerButton>Hapus</DangerButton>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <td class="py-4 text-center border-t" colspan="4">No data found.</td>
        </tbody>
      </table>
    </div>
  </div>
</template>
