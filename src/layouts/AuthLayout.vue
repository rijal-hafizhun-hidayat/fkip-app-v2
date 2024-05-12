<script setup>
import ApplicationLogo from '../components/ApplicationLogo.vue'
</script>
<template>
  <div>
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex items-center">
                <ApplicationLogo class="block h-12 fill-current text-gray-800" />
              </div>
              <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <RouterLink
                  activeClass="border-indigo-500"
                  exactActiveClass="border-indigo-900"
                  class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                  :to="{ name: 'dashboard.index' }"
                >
                  Dashboard
                </RouterLink>

                <RouterLink
                  activeClass="border-indigo-500"
                  exactActiveClass="border-indigo-900"
                  class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                  :to="{ name: 'role.index' }"
                >
                  Role
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <slot name="header" />
        </div>
      </header>

      <main class="py-5">
        <slot />
      </main>
    </div>
  </div>
</template>
