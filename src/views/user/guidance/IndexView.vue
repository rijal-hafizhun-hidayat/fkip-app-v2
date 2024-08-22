<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import WarningButton from '@/components/WarningButton.vue'
import DangerButton from '@/components/DangerButton.vue'
import HrefButton from '@/components/HrefButton.vue'
import { onMounted, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const swal = inject('swal')
const router = useRouter()
const route = useRoute()
const userGuidances = ref([])

onMounted(() => {
  getUserGuidanceByUserId()
})

const getUserGuidanceByUserId = () => {
  axios
    .get('guidance', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      params: {
        userId: route.params.id
      }
    })
    .then((res) => {
      console.log(res)
      userGuidances.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const showGuidanceByGuidanceId = (guidanceId) => {
  return router.push({
    name: 'user.guidance.show',
    params: {
      guidanceId: guidanceId
    }
  })
}

const destroyGuidanceByGuidanceId = (guidanceId) => {
  axios
    .delete(`guidance/${guidanceId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(() => {
      swal.fire({
        title: 'Success',
        text: 'Hapus bimbingan berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      getUserGuidanceByUserId()
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
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Bimbingan</h2></div>
        <div>
          <router-link
            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            :to="{ name: 'user.guidance.create' }"
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
              <th class="pb-4 pt-6 px-6">Keterangan bimnbingan</th>
              <th class="pb-4 pt-6 px-6">Tahapan bimbingan</th>
              <th class="pb-4 pt-6 px-6">Catatan bimbingan</th>
              <th class="pb-4 pt-6 px-6">Status</th>
              <th class="pb-4 pt-6 px-6">Link</th>
              <th class="pb-4 pt-6 px-6">Aksi</th>
            </tr>
          </thead>
          <tbody v-if="userGuidances.length !== 0">
            <tr
              v-for="(userGuidance, index) in userGuidances"
              :key="userGuidance.id"
              class="hover:bg-gray-100"
            >
              <td class="border-t items-center px-6 py-4">
                {{ index + 1 }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ userGuidance.guidance.guidance_statement }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ userGuidance.guidance.guidance_stage }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ userGuidance.guidance.guidance_note ?? '-' }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ userGuidance.guidance.status }}
              </td>
              <td class="border-t items-center px-6 py-4">
                <HrefButton :href="userGuidance.guidance.link" target="_blank">Link</HrefButton>
              </td>
              <td class="border-t items-center px-6 py-4">
                <div class="space-x-4">
                  <WarningButton @click="showGuidanceByGuidanceId(userGuidance.guidance.id)"
                    >Ubah</WarningButton
                  >
                  <DangerButton @click="destroyGuidanceByGuidanceId(userGuidance.guidance.id)"
                    >Hapus</DangerButton
                  >
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
