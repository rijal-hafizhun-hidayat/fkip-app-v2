<script setup>
import InputLabel from '../../components/InputLabel.vue'
import InputError from '../../components/InputError.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import TextInput from '../../components/TextInput.vue'
import { reactive, ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['errMessageLabel'])
const form = reactive({
  username: null,
  password: null
})
const validation = ref([])

const sendData = () => {
  axios
    .post('http://localhost:3000/api/login', {
      username: form.username,
      password: form.password
    })
    .then((res) => {
      axios.defaults.headers.common['Authorization'] = res.data.data.token
    })
    .catch((err) => {
      if (err.response.status == 404) {
        validation.value = []
        emit('errMessageLabel', err.response.data.errors)
      } else {
        validation.value = err.response.data.errors
      }
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

    <div class="flex items-center justify-end mt-4">
      <PrimaryButton type="submit">Masuk</PrimaryButton>
    </div>
  </form>
</template>
