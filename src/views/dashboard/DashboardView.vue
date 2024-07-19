<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
import DashboardComponent from './DashboardComponent.vue'
</script>

<template>
  <AuthLayout>
    <template #header>
      <div class="flex justify-between">
        <div><h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2></div>
      </div>
    </template>

    <DashboardComponent />
  </AuthLayout>
</template>
