<script setup>
import InputLabel from '@/components/InputLabel.vue'
import TextInput from '@/components/TextInput.vue'
import InputError from '@/components/InputError.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Multiselect from 'vue-multiselect'
import { reactive, ref, inject, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const swal = inject('swal')
const router = useRouter()
const route = useRoute()
const validation = ref([])
const guidanceStages = ref(['Luarans', 'Pra Pelaksana', 'Perangkat', 'Praktik Pembelajaran'])
const form = reactive({
  user_id: parseInt(route.params.id),
  guidance_statement: '',
  guidance_stage: '',
  link: ''
})

onMounted(() => {
  axios
    .get(`guidance/${route.params.guidanceId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      form.guidance_statement = res.data.data.guidance_statement
      form.guidance_stage = res.data.data.guidance_stage
      form.link = res.data.data.link
    })
    .catch((err) => {
      console.log(err)
    })
})

const send = () => {
  axios
    .put(
      `guidance/${route.params.guidanceId}`,
      {
        user_id: form.user_id,
        guidance_statement: form.guidance_statement,
        guidance_stage: form.guidance_stage,
        link: form.link
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
        text: 'Ubah bimbingan berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      return router.push({
        name: 'user.guidance.index',
        params: {
          id: route.params.id
        }
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
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">Ubah bimbingan</h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <div class="whitespace-nowrap">
          <form @submit.prevent="send()" class="space-y-4">
            <div>
              <InputLabel>Keterangan bimbingan</InputLabel>
              <TextInput
                class="mt-1 block w-full"
                type="text"
                v-model="form.guidance_statement"
                autofocus
              />
              <InputError
                v-if="validation.guidance_statement"
                :message="validation.guidance_statement._errors[0]"
              />
            </div>
            <div>
              <InputLabel>Tahapan bimbingan</InputLabel>
              <multiselect
                v-model="form.guidance_stage"
                :options="guidanceStages"
                placeholder="Select one"
              ></multiselect>
              <InputError
                v-if="validation.guidance_stage"
                :message="validation.guidance_stage._errors[0]"
              />
            </div>
            <div>
              <InputLabel>Link</InputLabel>
              <TextInput class="mt-1 block w-full" type="text" v-model="form.link" autofocus />
              <InputError v-if="validation.link" :message="validation.link._errors[0]" />
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
