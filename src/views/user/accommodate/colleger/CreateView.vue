<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import InputLabel from '@/components/InputLabel.vue'
import InputError from '@/components/InputError.vue'
import Multiselect from 'vue-multiselect'
import { onMounted, ref, reactive, inject } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const swal = inject('swal')
const router = useRouter()
const validation = ref([])
const role = ref([2])
const users = ref([])
const accommodate = reactive({
  user: ''
})

onMounted(() => {
  axios
    .get(`users/${role.value}/role`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      users.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
})

const send = () => {
  axios
    .post(
      'accommodate/colleger',
      {
        user_id: parseInt(route.params.id),
        user_id_accommodate: accommodate.user ? accommodate.user.id : ''
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )
    .then(() => {
      swal.fire({
        title: 'Success',
        text: 'Mahasiswa berhasil terhubung',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      return router.push({
        name: 'user.detail',
        params: {
          id: route.params.id
        }
      })
    })
    .catch((err) => {
      if (err.response.status === 400) {
        validation.value = err.response.data.errors
      }

      if (err.response.status === 404) {
        swal.fire({
          title: 'error',
          text: err.response.data.errors,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
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
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Tambah hubungan mahasiswa
          </h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md">
        <div class="whitespace-nowrap">
          <form @submit.prevent="send()" class="space-y-4">
            <div>
              <InputLabel>Mahasiswa</InputLabel>
              <multiselect
                v-model="accommodate.user"
                :options="users"
                :custom-label="nameWithLang"
                placeholder="Select one"
                label="name"
                track-by="name"
              ></multiselect>
              <InputError
                v-if="validation.user_id_accommodate"
                :message="validation.user_id_accommodate._errors[0]"
              />
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
