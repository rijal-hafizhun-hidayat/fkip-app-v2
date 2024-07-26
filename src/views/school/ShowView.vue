<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import InputLabel from '../../components/InputLabel.vue'
import TextInput from '../../components/TextInput.vue'
import InputError from '../../components/InputError.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import Multiselect from 'vue-multiselect'
import { onMounted, reactive, ref, inject } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const validation = ref([])
const plps = ref([])
const route = useRoute()
const router = useRouter()
const swal = inject('swal')
const school = reactive({
  name: null,
  plp: ''
})
onMounted(() => {
  getSchoolById()
  getPlps()
})

const getSchoolById = () => {
  axios
    .get(`school/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res)
      school.name = res.data.data.name
      school.plp = res.data.data.schools[0].plp
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status == 400) {
        validation.value = err.response.data.errors
      }
    })
}

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

const send = () => {
  axios
    .put(
      `school/${route.params.id}`,
      {
        name: school.name,
        plp_id: school.plp.id
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
        text: 'Ubah sekolah berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      return router.push({
        name: 'school.index'
      })
    })
    .catch((err) => {
      console.log(err)
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
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Ubah Sekolah</h2></div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <div class="whitespace-nowrap">
          <form @submit.prevent="send()" class="space-y-4">
            <div>
              <InputLabel>Nama Sekolah</InputLabel>
              <TextInput class="mt-1 block w-full" type="text" v-model="school.name" autofocus />
              <InputError v-if="validation.name" :message="validation.name._errors[0]" />
            </div>
            <div>
              <InputLabel>PLP</InputLabel>
              <multiselect
                v-model="school.plp"
                :options="plps"
                :custom-label="nameWithLang"
                placeholder="Select one"
                label="name"
                track-by="name"
              ></multiselect>
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
