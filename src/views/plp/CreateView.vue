<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import InputLabel from '../../components/InputLabel.vue'
import TextInput from '../../components/TextInput.vue'
import InputError from '../../components/InputError.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import Multiselect from 'vue-multiselect'
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

const validation = ref([])
const schoolYears = ref([])
const plp = reactive({
  name: null,
  school_year_id: ''
})

onMounted(() => {
  getSchoolYear()
})

const getSchoolYear = () => {
  axios
    .get('school-year', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

const send = () => {
  console.log(plp)
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
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">Tambah Role</h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <div class="whitespace-nowrap">
          <form @submit.prevent="send()" class="space-y-4">
            <div>
              <InputLabel>Nama Plp</InputLabel>
              <TextInput class="mt-1 block w-full" type="text" v-model="plp.name" autofocus />
              <InputError v-if="validation.name" :message="validation.name._errors[0]" />
            </div>
            <div>
              <InputLabel>Tahun ajaran</InputLabel>
              <multiselect
                v-model="plp.school_year_id"
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
