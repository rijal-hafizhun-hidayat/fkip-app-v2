<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import { onMounted, ref, inject, reactive } from 'vue'
import axios from 'axios'
import DangerButton from '../../components/DangerButton.vue'
import WarningButton from '../../components/WarningButton.vue'
import TextInput from '../../components/TextInput.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const plps = ref([])
const moment = inject('moment')
const swal = inject('swal')
const search = reactive({
  namePlp: null
})

onMounted(() => {
  getPlp()
})

const searchPlp = () => {
  console.log(search.namePlp)
}

const getPlp = () => {
  axios
    .get('plp', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res)
      plps.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const destroyPlpById = (id) => {
  axios
    .delete(`plp/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(() => {
      swal.fire({
        title: 'Success',
        text: 'Hapus Plp berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      getPlp()
    })
    .catch((err) => {
      console.log(err)
    })
}

const showPlpById = (plpId) => {
  return router.push({
    name: 'plp.show',
    params: {
      id: plpId
    }
  })
}
</script>
<template>
  <AuthLayout>
    <template #header>
      <div class="flex justify-between">
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Plp</h2></div>
        <div>
          <router-link
            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            :to="{ name: 'plp.create' }"
            >Tambah</router-link
          >
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <form @submit.prevent="searchPlp()">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <TextInput
                class="block w-full"
                type="text"
                v-model="search.namePlp"
                placeholder="Cari berdasarkan nama"
              ></TextInput>
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
              <th class="pb-4 pt-6 px-6">Tahun Ajaran</th>
              <th class="pb-4 pt-6 px-6">Dibuat</th>
              <th class="pb-4 pt-6 px-6">Diubah</th>
              <th class="pb-4 pt-6 px-6">Aksi</th>
            </tr>
          </thead>
          <tbody v-if="plps.length !== 0">
            <tr v-for="(plp, index) in plps" :key="plp.id" class="hover:bg-gray-100">
              <td class="border-t items-center px-6 py-4">
                {{ index + 1 }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ plp.name }}
              </td>
              <td
                v-for="schoolYear in plp.school_years"
                :key="schoolYear.id"
                class="border-t items-center px-6 py-4"
              >
                {{ schoolYear.school_year.name }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ moment(plp.created_at).format('DD MMMM YYYY') }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ moment(plp.updated_at).format('DD MMMM YYYY') }}
              </td>
              <td class="border-t items-center px-6 py-4">
                <div class="space-x-4">
                  <WarningButton @click="showPlpById(plp.id)">Ubah</WarningButton>
                  <DangerButton @click="destroyPlpById(plp.id)">Hapus</DangerButton>
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
