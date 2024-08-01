<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import InputLabel from '@/components/InputLabel.vue'
import InputError from '@/components/InputError.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import Multiselect from 'vue-multiselect'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref, inject } from 'vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const swal = inject('swal')
const validation = ref([])
const plps = ref([])
const user = reactive({
  plp: ''
})

onMounted(() => {
  getPlps()
  getUserPlpById()
})

const getPlps = () => {
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

const getUserPlpById = () => {
  axios
    .get(`me/user-plp/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res)
      user.plp = res.data.data.plp
    })
    .catch((err) => {
      console.log(err)
    })
}

const nameWithLang = ({ name }) => {
  return `${name}`
}

const send = () => {
  console.log(user, route.params.id)
  axios
    .put(
      `me/user-plp/${route.params.id}`,
      {
        plp_id: user.plp.id
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )
    .then((res) => {
      console.log(res)
      swal.fire({
        title: 'Success',
        text: 'Ubah Pengguna PLP berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      return router.push({
        name: 'profile.index'
      })
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
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">Ubah Jenis PLP</h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md">
        <div class="whitespace-nowrap">
          <form @submit.prevent="send()" class="space-y-4">
            <div>
              <InputLabel>Jenis PLP</InputLabel>
              <multiselect
                v-model="user.plp"
                :options="plps"
                :custom-label="nameWithLang"
                placeholder="Select one"
                label="name"
                track-by="name"
              ></multiselect>
              <InputError v-if="validation.plp_id" :message="validation.plp_id._errors[0]" />
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
