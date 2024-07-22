<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import InputLabel from '../../components/InputLabel.vue'
import TextInput from '../../components/TextInput.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import InputError from '../../components/InputError.vue'
import Multiselect from 'vue-multiselect'
import { reactive, onMounted, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const validation = ref([])
const swal = inject('swal')
const route = useRoute()
const router = useRouter()
const role = reactive({
  name: null,
  guard: ''
})
const options = ref([
  {
    name: 'pegawai uad',
    value: true
  },
  {
    name: 'pengguna',
    value: false
  }
])

onMounted(() => {
  getRoleById(route.params.id)
})

const getRoleById = (roleId) => {
  axios
    .get(`role/${roleId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((res) => {
      role.name = res.data.data.name
      role.guard = res.data.data.guard
    })
    .catch((err) => {
      console.log(err)
    })
}

const send = () => {
  axios
    .put(
      `role/${route.params.id}`,
      {
        name: role.name,
        guard: role.guard.value
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
        text: 'Ubah role berhasil',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      return router.push({
        name: 'role.index'
      })
    })
    .catch((err) => {
      if (err.response.status == 400) {
        validation.value = err.response.data.errors
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
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Ubah Role</h2></div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <div class="whitespace-nowrap">
          <form @submit.prevent="send()" class="space-y-4">
            <div>
              <InputLabel>Nama Role</InputLabel>
              <TextInput class="mt-1 block w-full" type="text" v-model="role.name" autofocus />
              <InputError v-if="validation.name" :message="validation.name._errors[0]" />
            </div>
            <div>
              <InputLabel>Hak Akses</InputLabel>
              <multiselect
                v-model="role.guard"
                :options="options"
                :custom-label="nameWithLang"
                placeholder="Select one"
                label="name"
                track-by="name"
              ></multiselect>
              <InputError v-if="validation.guard" :message="validation.guard._errors[0]" />
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
