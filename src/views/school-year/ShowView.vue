<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import InputLabel from '../../components/InputLabel.vue'
import TextInput from '../../components/TextInput.vue'
import InputError from '../../components/InputError.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import { reactive, inject, ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const validation = ref([])
const route = useRoute()
const router = useRouter()
const swal = inject('swal')
const schoolYear = reactive({
  name: null
})

onMounted(() => {
  getSchoolYearById()
})

const getSchoolYearById = () => {
  axios
    .get(`school-year/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      schoolYear.name = res.data.data.name
    })
    .catch((err) => {
      console.log(err)
    })
}

const send = () => {
  axios
    .put(
      `school-year/${route.params.id}`,
      {
        name: schoolYear.name
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
        text: 'Ubah tahun ajaran berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      return router.push({
        name: 'school-year.index'
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
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">Ubah Tahun Ajaran</h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <div class="whitespace-nowrap">
          <form @submit.prevent="send()" class="space-y-4">
            <div>
              <InputLabel>Nama Tahun Ajaran</InputLabel>
              <TextInput
                class="mt-1 block w-full"
                type="text"
                v-model="schoolYear.name"
                autofocus
              />
              <InputError v-if="validation.name" :message="validation.name._errors[0]" />
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
