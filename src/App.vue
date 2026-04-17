<template>
  <div class="min-h-screen bg-white text-gray-800">
    <router-view />
    
    <GlobalModal />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// Import komponen modal
import GlobalModal from '@/components/common/GlobalModal.vue'

onMounted(() => {
  // Memaksa HTML menggunakan tema terang (light) dari FlyonUI
  document.documentElement.setAttribute('data-theme', 'light')
})
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: white; /* Pengaman tambahan */
}

* {
  box-sizing: border-box;
  font-family: 'Inter', Arial, sans-serif;
}
</style>