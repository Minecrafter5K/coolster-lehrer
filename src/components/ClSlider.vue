<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ value: number }>()
const emit = defineEmits<{
  (e: 'update:value', value: number): void
}>()

const sliderValue = ref(props.value)
const snapPoints: number[] = [-2, -1, 0, 1, 2]

const snapToClosest = (): void => {
  sliderValue.value = snapPoints.reduce((prev, curr) =>
    Math.abs(curr - sliderValue.value) < Math.abs(prev - sliderValue.value) ? curr : prev,
  )
  emit('update:value', sliderValue.value)
}
</script>

<template>
  <div class="slider-container">
    <input
      type="range"
      min="-2"
      max="2"
      step="1"
      v-model="sliderValue"
      class="slider"
      @input="snapToClosest"
    />
  </div>
</template>

<style scoped>
/* Slider CSS */
.slider-container {
  width: 204px;
  margin-left: calc(calc(280px - 204px) / 2);
  position: absolute;
  margin-top: 80px;
}

.slider {
  width: 100%;
  -webkit-appearance: none;
  background: var(--cl-light-blue);
  height: 6px;
  border-radius: 3px;
  position: relative;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: var(--cl-blue);
  border-radius: 50%;
  cursor: pointer;
  margin-top: 0;
}
</style>
