<script setup>
import InputLabel from '../../components/InputLabel.vue'
import InputError from '../../components/InputError.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
</script>
<template>
  <form>
    <div class="space-y-4">
      <div>
        <InputLabel>Username</InputLabel>
        <input
          type="text"
          class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
        />
        <InputError />
      </div>

      <div>
        <InputLabel>Password</InputLabel>
        <input
          type="text"
          class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
        />
        <InputError />
      </div>
    </div>

    <div class="flex items-center justify-end mt-4">
      <PrimaryButton>Masuk</PrimaryButton>
    </div>
  </form>
</template>
