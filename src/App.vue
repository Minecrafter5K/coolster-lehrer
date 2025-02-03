<script setup lang="ts">
import { RouterView } from 'vue-router'
import ClHeader from '@/components/ClHeader.vue'
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <ClHeader />
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  margin-left: calc(5rem + 5vw);
  margin-right: calc(5rem + 5vw);
}

@media (max-width: 870px) {
  .wrapper {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
}

.header {
  margin-top: 1rem;
}
</style>
