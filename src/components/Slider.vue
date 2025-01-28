<script setup lang="ts">
import { ref } from "vue";

const sliderValue = ref<number>(2);
const snapPoints: number[] = [0, 1, 2, 3, 4];

const snapToClosest = (): void => {
  const closest = snapPoints.reduce((prev, curr) =>
    Math.abs(curr - sliderValue.value) < Math.abs(prev - sliderValue.value) ? curr : prev
  );
  sliderValue.value = closest;
};
</script>

<template>
  <div class="slider-container">
    <input
      type="range"
      min="0"
      max="4"
      step="1"
      v-model="sliderValue"
      class="slider"
      @input="snapToClosest"
    />
  </div>
</template>

<style scoped>

</style>
