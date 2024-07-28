<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const createAccommodateDpl = () => {
  return router.push({
    name: 'user.detail.create-accommodate-dpl'
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
          </tr>
        </thead>
        <tbody>
          <td class="py-4 text-center border-t" colspan="2">No data found.</td>
        </tbody>
      </table>
    </div>
  </div>
</template>
