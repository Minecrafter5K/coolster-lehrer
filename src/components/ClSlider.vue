<script setup lang="ts">
import { ref } from 'vue'
import soundFile from '../assets/scroll.mp3'

const props = defineProps<{ value: number; sound?: boolean }>()
const emit = defineEmits<{
  (e: 'update:value', value: number): void
}>()

const sliderValue = ref(props.value)
const snapPoints: number[] = [-2, -1, 0, 1, 2]

let snapSound: HTMLAudioElement
if (props.sound) snapSound = new Audio(soundFile)

const snapToClosest = (): void => {
  const previousValue = sliderValue.value
  sliderValue.value = snapPoints.reduce((prev, curr) =>
    Math.abs(curr - sliderValue.value) < Math.abs(prev - sliderValue.value) ? curr : prev,
  )

  // Play sound only if the value actually changed
  if (sliderValue.value !== previousValue && props.sound) {
    snapSound.currentTime = 0 // Reset sound to start
    snapSound.play().catch((err) => console.error('Error playing sound:', err))
  }

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
    <div class="slider-stops">
      <div class="slider-bg" />
      <span
        v-for="point in snapPoints"
        :key="point"
        class="stop"
        :style="{ left: `${(point + 2) * 25}%` }"
      ></span>
    </div>
  </div>
</template>

<style scoped>
/* Slider CSS */
.slider-container {
  width: 204px;
  margin-left: calc(calc(280px - 204px) / 2);
  margin-top: 80px;
  position: relative;
}

.slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  background: var(--cl-light-blue);
  height: 6px;
  border-radius: 3px;
  position: relative;

  z-index: 1;
  background: transparent;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: var(--cl-blue);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  margin-top: 0;
}

.slider::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--cl-blue);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  margin-top: 0;
}

.slider-bg {
  height: 6px;
  width: calc(100% + 6px);
  transform: translate(-3px, 0);

  border-radius: 3px;

  background-color: var(--cl-light-blue);
}

.slider-stops {
  position: absolute;
  left: 5%;
  width: 90%;
  height: 6px;
  top: 36%;
  transform: translateY(-50%);
  pointer-events: none;
}

.stop {
  width: 4px;
  height: 4px;
  background-color: var(--cl-slider-dots);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
