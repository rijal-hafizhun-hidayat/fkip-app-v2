<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import InputLabel from '../../components/InputLabel.vue'
import TextInput from '../../components/TextInput.vue'
import InputError from '../../components/InputError.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import Multiselect from 'vue-multiselect'
import { onMounted, ref, reactive, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const swal = inject('swal')
const validation = ref([])
const schoolYears = ref([])
const route = useRoute()
const router = useRouter()
const plp = reactive({
  name: null,
  schoolYear: ''
})

onMounted(() => {
  getPlpById()
  getSchoolYears()
})

const getPlpById = () => {
  axios
    .get(`plp/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res)
      plp.name = res.data.data.name
      plp.schoolYear = res.data.data.school_years[0].school_year
    })
    .catch((err) => {
      console.log(err)
    })
}

const getSchoolYears = () => {
  axios
    .get('school-year', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      schoolYears.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const updatePlpById = () => {
  axios
    .put(
      `plp/${route.params.id}`,
      {
        name: plp.name,
        school_year_id: plp.schoolYear.id
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
        text: 'Ubah Plp berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      return router.push({
        name: 'plp.index'
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
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">Ubah Plp</h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <div class="whitespace-nowrap">
          <form @submit.prevent="updatePlpById()" class="space-y-4">
            <div>
              <InputLabel>Nama Plp</InputLabel>
              <TextInput class="mt-1 block w-full" type="text" v-model="plp.name" autofocus />
              <InputError v-if="validation.name" :message="validation.name._errors[0]" />
            </div>
            <div>
              <InputLabel>Tahun ajaran</InputLabel>
              <multiselect
                v-model="plp.schoolYear"
                :options="schoolYears"
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
