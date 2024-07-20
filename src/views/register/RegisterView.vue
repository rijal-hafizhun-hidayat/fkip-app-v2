<script setup>
import GuestLayout from '../../layouts/GuestLayout.vue'
import InputLabel from '../../components/InputLabel.vue'
import InputError from '../../components/InputError.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import Multiselect from 'vue-multiselect'
import TextInput from '../../components/TextInput.vue'
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

const roles = ref([])
const validation = ref([])
const form = reactive({
  name: null,
  username: null,
  email: null,
  password: null,
  plp_id: ''
})

onMounted(() => {
  axios
    .get('role-not-admin')
    .then((res) => {
      console.log(res)
      roles.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
})

const register = () => {
  console.log(form)
}

const nameWithLang = ({ name }) => {
  return `${name}`
}
</script>
<template>
  <GuestLayout>
    <form @submit.prevent="register()" class="space-y-4">
      <div>
        <InputLabel>Name</InputLabel>
        <TextInput class="mt-1 block w-full" type="text" v-model="form.name" />
        <InputError v-if="validation.name" :message="validation.name._errors[0]" />
      </div>
      <div>
        <InputLabel>Username</InputLabel>
        <TextInput class="mt-1 block w-full" type="text" v-model="form.username" />
        <InputError v-if="validation.username" :message="validation.username._errors[0]" />
      </div>
      <div>
        <InputLabel>Email</InputLabel>
        <TextInput class="mt-1 block w-full" type="email" v-model="form.email" />
        <InputError v-if="validation.email" :message="validation.email._errors[0]" />
      </div>
      <div>
        <InputLabel>Password</InputLabel>
        <TextInput class="mt-1 block w-full" type="password" v-model="form.password" />
        <InputError v-if="validation.password" :message="validation.password._errors[0]" />
      </div>
      <div>
        <InputLabel>Role</InputLabel>
        <multiselect
          v-model="form.plp_id"
          :options="roles"
          :custom-label="nameWithLang"
          placeholder="Select one"
          label="name"
          track-by="name"
        ></multiselect>
      </div>
      <div>
        <PrimaryButton type="submit">Register</PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>
