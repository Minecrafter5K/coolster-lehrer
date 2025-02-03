<script setup lang="ts">
import { RouterView } from 'vue-router'
import ClHeader from '@/components/ClHeader.vue'
</script>

<template>
  <div class="wrapper">
    <header>
      <ClHeader />
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  margin-left: 6rem;
  margin-right: 6rem;
}
</style>
