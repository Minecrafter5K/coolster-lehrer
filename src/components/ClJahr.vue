<script setup lang="ts">
import type { AbstimmungDetail } from '@/interfaces/Abstimmung.ts'

const props = defineProps<{
  abstimmung: AbstimmungDetail
}>()
</script>

<template>
  <div class="p_light_background">
    <h1>&raquo;</h1>
    <h3>
      1. Platz:<br />
      <span class="name">{{ props.abstimmung.winner.name }}</span>
    </h3>
    <div class="p_dark">
      <h2>{{ props.abstimmung.name }}</h2>
    </div>
    <div class="p_light_line"></div>
  </div>
</template>

<style scoped>
.p_light_background {
  height: 280px;
  width: 100%;
  background-color: var(--cl-light-green);
  border-radius: 25px;

  position: relative;
  float: left;
  overflow: hidden;
}

.p_dark {
  height: 60%;
  width: 100%;
  background-color: var(--cl-green);

  display: grid;
  position: absolute;
  top: 0;
}

.p_light_line {
  position: absolute;
  height: 1px;
  width: 100%;
  background-color: var(--cl-white);

  top: calc(60% - 1px);
}

h1 {
  color: var(--cl-green);
  position: absolute;
  right: 20px;
  bottom: -10px;
  font-size: 70px;
}

h2 {
  font-size: 50px;
  font-weight: bold;

  align-self: center;
  justify-self: center;
  position: absolute;
}

h3 {
  position: absolute;
  bottom: 20px;
  left: 20px;

  font-weight: 400;
  line-height: 1.3;
  font-size: 20px;
}

.name {
  font-weight: 550;
}

@media (min-width: 650px) {
  .p_light_background {
    height: 170px;
    width: 100%;
    background-color: var(--cl-light-green);
    border-radius: 25px;

    position: relative;
    float: left;
    overflow: hidden;
  }

  .p_dark {
    height: 100%;
    width: 50%;
    background-color: var(--cl-green);

    display: grid;
    position: absolute;
  }

  .p_light_line {
    position: absolute;
    height: 170px;
    width: 1px;
    background-color: var(--cl-white);
    left: calc(50% - 1px);
    top: 0;
  }

  h3 {
    text-align: right;
    position: absolute;
    top: 20px;
    right: 25px;

    font-weight: 400;
    line-height: 1.3;
    font-size: 20px;
  }
}
</style>
