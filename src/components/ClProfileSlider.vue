<script setup lang="ts">
import ClSlider from './ClSlider.vue'
import type { Lehrer } from '@/interfaces/Lehrer.ts'

const props = defineProps<{ lehrer: Lehrer; voteValue: number }>()
const emit = defineEmits<{
  (e: 'update:voteValue', value: number): void
}>()
</script>

<template>
  <div class="p_light_background">
    <div class="p_dark">
      <h2>{{ props.lehrer.name }}</h2>
      <div class="p_light_line"></div>
      <ClSlider
        :value="props.voteValue"
        @update:value="($event) => emit('update:voteValue', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.p_light_background {
  height: 340px;
  width: 280px;
  background-color: var(--cl-light-green);
  border-radius: 25px;

  position: relative;
  float: left;
}

.p_dark {
  height: 120px;
  width: 280px;
  background-color: var(--cl-green);
  border-radius: 25px;

  display: grid;
  position: absolute;
  bottom: 0;
}

.p_light_line {
  position: absolute;
  height: 1px;
  width: 204px;
  background-color: var(--cl-light-green);

  margin-left: calc(calc(280px - 204px) / 2);
  margin-top: 70px;
}

h2 {
  align-self: center;
  justify-self: center;
  position: absolute;
  margin-top: -50px;
}
</style>
