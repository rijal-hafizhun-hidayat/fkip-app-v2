<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import UserPlpComponent from './components/UserPlpComponent.vue'
import UpdatePasswordComponent from './components/UpdatePasswordComponent.vue'
import UpdateProfileComponent from './components/UpdateProfileComponent.vue'
</script>
<template>
  <AuthLayout>
    <template #header>
      <div class="flex justify-between">
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Profile</h2></div>
      </div>
    </template>

    <UpdateProfileComponent />
    <UpdatePasswordComponent />
    <UserPlpComponent />
  </AuthLayout>
</template>
