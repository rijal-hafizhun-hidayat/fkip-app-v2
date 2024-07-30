<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import DangerButton from '../../../components/DangerButton.vue'
import WarningButton from '../../../components/WarningButton.vue'
import { useRouter } from 'vue-router'
import { ref, inject, onMounted } from 'vue'
import axios from 'axios'

const router = useRouter()
const moment = inject('moment')
const userPlps = ref([])

onMounted(() => {
  axios
    .get('me/type-plp', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res)
      userPlps.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
})

const createTypePlpProfile = () => {
  return router.push({
    name: 'profile.create-type-plp'
  })
}

const showUserPlpById = (userPlpId) => {
  console.log(userPlpId)
}

const destroyUserPlpById = (userPlpId) => {
  console.log(userPlpId)
}
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <div class="flex justify-between">
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Jenis PLP</h2></div>
        <div><PrimaryButton @click="createTypePlpProfile()">Tambah</PrimaryButton></div>
      </div>
      <table class="w-full whitespace-nowrap">
        <thead>
          <tr class="text-left font-bold">
            <th class="pb-4 pt-6 px-6">#</th>
            <th class="pb-4 pt-6 px-6">Jenis PLP</th>
            <th class="pb-4 pt-6 px-6">Dibuat</th>
            <th class="pb-4 pt-6 px-6">Diubah</th>
            <th class="pb-4 pt-6 px-6">Aksi</th>
          </tr>
        </thead>
        <tbody v-if="userPlps.length !== 0">
          <tr v-for="(userPlp, index) in userPlps" :key="userPlp.id" class="hover:bg-gray-100">
            <td class="border-t items-center px-6 py-4">
              {{ index + 1 }}
            </td>
            <td class="border-t items-center px-6 py-4">
              {{ userPlp.plp.name }}
            </td>
            <td class="border-t items-center px-6 py-4">
              {{ moment(userPlp.created_at).format('DD MMMM YYYY') }}
            </td>
            <td class="border-t items-center px-6 py-4">
              {{ moment(userPlp.updated_at).format('DD MMMM YYYY') }}
            </td>
            <td class="border-t items-center px-6 py-4">
              <div class="space-x-4">
                <WarningButton @click="showUserPlpById(userPlp.id)">Ubah</WarningButton>
                <DangerButton @click="destroyUserPlpById(userPlp.id)">Hapus</DangerButton>
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
</template>
