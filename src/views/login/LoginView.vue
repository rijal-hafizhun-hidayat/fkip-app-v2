<script setup>
import LoginComponent from './LoginComponent.vue'
import GuestLayout from '../../layouts/GuestLayout.vue'
import AlertLabel from '../../components/AlertLabel.vue'
import { ref } from 'vue'

const message = ref(null)
const messageLabel = (messageValue) => {
  message.value = messageValue
}
</script>
<template>
  <GuestLayout>
    <AlertLabel class="bg-red-500" v-show="message !== null">{{ message }}</AlertLabel>
    <LoginComponent @errMessageLabel="messageLabel" />
  </GuestLayout>
</template>
