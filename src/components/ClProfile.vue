<script setup lang="ts">
import ClSlider from './ClSlider.vue'

const props = defineProps(['name'])
</script>

<template>
  <div class="p_light_background">
    <div class="p_dark">
      <h2>{{ props.name }}</h2>
      <div class="p_light_line"></div>
      <ClSlider />
    </div>
  </div>
</template>

<style scoped></style>
