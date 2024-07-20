<script setup>
import InputLabel from '../../../components/InputLabel.vue'
import InputError from '../../../components/InputError.vue'
import PrimaryButton from '../../../components/PrimaryButton.vue'
import TextInput from '../../../components/TextInput.vue'
import { reactive, ref } from 'vue'
import axios from 'axios'
import { userAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = userAuthStore()
const emit = defineEmits(['errMessageLabel'])
const form = reactive({
  username: null,
  password: null
})
const validation = ref([])

const sendData = () => {
  axios
    .post('login', {
      username: form.username,
      password: form.password
    })
    .then((res) => {
      auth.user.token = res.data.data.token
      auth.user.name = res.data.data.name

      sessionStorage.setItem('token', res.data.data.token)
      sessionStorage.setItem('name', res.data.data.name)

      sessionStorage.setItem('isLoggedIn', true)

      router.push({
        name: 'dashboard.index'
      })
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status == 404) {
        validation.value = []
        emit('errMessageLabel', err.response.data.errors)
      } else {
        validation.value = err.response.data.errors
      }
    })
}

const showRegisterForm = () => {
  return router.push({
    name: 'register'
  })
}
</script>
<template>
  <form @submit.prevent="sendData">
    <div class="space-y-4">
      <div>
        <InputLabel>Username</InputLabel>
        <TextInput class="mt-1 block w-full" type="text" v-model="form.username" autofocus />
        <InputError v-if="validation.username" :message="validation.username._errors[0]" />
      </div>

      <div>
        <InputLabel>Password</InputLabel>
        <TextInput class="mt-1 block w-full" type="password" v-model="form.password" autofocus />
        <InputError v-if="validation.password" :message="validation.password._errors[0]" />
      </div>
    </div>

    <div class="flex items-center justify-between mt-4">
      <p class="text-sm">
        Belum memiliki akun? klik
        <span class="text-blue-500 underline cursor-pointer" @click="showRegisterForm()"
          >register</span
        >
      </p>
      <PrimaryButton type="submit">Masuk</PrimaryButton>
    </div>
  </form>
</template>
