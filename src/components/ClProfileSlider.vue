<script setup lang="ts">
import ClSlider from './ClSlider.vue'
import type { Lehrer } from '@/interfaces/Lehrer.ts'
import { ref, onMounted } from 'vue'

const props = defineProps<{ lehrer: Lehrer; voteValue: number }>()
const emit = defineEmits<{
  (e: 'update:voteValue', value: number): void
}>()

// pfp: default and API-loaded image
const imageSrc = ref<string>(`/pfps/blank_pfp.png`)
onMounted(async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const res = await fetch(`${baseUrl}/lehrer/${props.lehrer.id}/photo`)
    if (res.ok) {
      imageSrc.value = `data:image/png;base64,${await res.text()}`
    }
  } catch {}
})
</script>

<template>
  <div class="p_light_background">
    <img :src="imageSrc" alt="profile picture" />
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

img {
  position: absolute;
  width: 180px;
  height: 180px;
  object-fit: cover;

  top: 40px;
  left: 50px;
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
