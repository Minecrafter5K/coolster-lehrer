<script setup lang="ts">
import { RouterView } from 'vue-router'
import ClHeader from '@/components/ClHeader.vue'
</script>

<template>
  <header>
    <ClHeader />
  </header>

  <RouterView />
</template>

<style scoped></style>
