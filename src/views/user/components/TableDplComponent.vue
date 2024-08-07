<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import DangerButton from '@/components/DangerButton.vue'
import WarningButton from '@/components/WarningButton.vue'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const accommodates = ref([])

onMounted(() => {
  getAccommodateDplByUserId()
})

const getAccommodateDplByUserId = () => {
  axios
    .get('accommodate/dpl', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      params: {
        user_id: route.params.id
      }
    })
    .then((res) => {
      accommodates.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const createAccommodateDpl = () => {
  return router.push({
    name: 'user.detail.accommodate-dpl.create'
  })
}

const showAccommodateDplByAccommodateId = (accommodateId) => {
  return router.push({
    name: 'user.detail.accommodate-dpl.show',
    params: {
      accommodateId: accommodateId
    }
  })
}
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <div class="flex justify-between">
        <div><h1 class="font-bold text-xl">DPL</h1></div>
        <div>
          <PrimaryButton @click="createAccommodateDpl()">Tambah</PrimaryButton>
        </div>
      </div>
      <table class="w-full whitespace-nowrap">
        <thead>
          <tr class="text-left font-bold">
            <th class="pb-4 pt-6 px-6">#</th>
            <th class="pb-4 pt-6 px-6">Nama DPL</th>
            <th class="pb-4 pt-6 px-6">Aksi</th>
          </tr>
        </thead>
        <tbody v-if="accommodates.length !== 0">
          <tr v-for="(accommodate, index) in accommodates" :key="accommodate.id">
            <td class="border-t items-center px-6 py-4">{{ index + 1 }}</td>
            <td class="border-t items-center px-6 py-4">{{ accommodate.user_dpl.name }}</td>
            <td class="border-t items-center px-6 py-4">
              <div class="space-x-4">
                <WarningButton @click="showAccommodateDplByAccommodateId(accommodate.id)"
                  >Ubah</WarningButton
                >
                <DangerButton>Hapus</DangerButton>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="py-4 text-center border-t" colspan="3">No data found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
