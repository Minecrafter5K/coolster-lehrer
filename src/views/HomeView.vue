<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const sliderValue = ref(2);
    const snapPoints = [0, 1, 2, 3, 4];

    const snapToClosest = () => {
      const closest = snapPoints.reduce((prev, curr) =>
        Math.abs(curr - sliderValue.value) < Math.abs(prev - sliderValue.value) ? curr : prev
      );
      sliderValue.value = closest;
    };

    return {
      sliderValue,
      snapToClosest
    };
  }
};
</script>

<template>
  <main>
    <h1>Was geht?</h1>
    <div class="p_light_background">
      <div class="p_light">
        <div class="p_light_line"></div>
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
      </div>
    </div>
  </main>
</template>
