<script setup lang="ts">
import type { LehrerWithScore } from '@/interfaces/Lehrer.ts'
import { computed } from 'vue'

const props = defineProps<{ lehrer: LehrerWithScore }>()

const rank = computed(() => 'rank-' + props.lehrer.rank)
</script>

<template>
  <div class="p_light_background" v-bind:class="rank">
    <div class="p_dark" v-bind:class="rank">
      <h2>{{ props.lehrer.name }}</h2>
      <div class="p_light_line" v-bind:class="rank"></div>
      <h3>{{ props.lehrer.rank }}. Platz</h3>
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
.p_light_background.rank-1 {
  background-color: var(--cl-l-gold);
}
.p_light_background.rank-2 {
  background-color: var(--cl-l-silver);
}
.p_light_background.rank-3 {
  background-color: var(--cl-l-bronze);
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
.p_dark.rank-1 {
  background-color: var(--cl-l-gold-dark);
}
.p_dark.rank-2 {
  background-color: var(--cl-l-silver-dark);
}
.p_dark.rank-3 {
  background-color: var(--cl-l-bronze-dark);
}

.p_light_line {
  position: absolute;
  height: 1px;
  width: 204px;
  background-color: var(--cl-light-green);

  margin-left: calc(calc(280px - 204px) / 2);
  margin-top: 70px;
}
.p_light_line.rank-1 {
  background-color: var(--cl-l-gold);
}
.p_light_line.rank-2 {
  background-color: var(--cl-l-silver);
}
.p_light_line.rank-3 {
  background-color: var(--cl-l-bronze);
}

h2 {
  align-self: center;
  justify-self: center;
  position: absolute;
  margin-top: -50px;
}

h3 {
  align-self: center;
  justify-self: center;
  position: absolute;
  margin-top: 65px;
}
</style>
