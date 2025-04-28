<template>
  <div class="domino-card">
    <div class="half top">
      <div v-for="(dot, index) in dotPatterns[leftValue]" :key="index" class="dot" :class="dot" />
    </div>
    <div class="divider"></div>
    <div class="half bottom">
      <div v-for="(dot, index) in dotPatterns[rightValue]" :key="index" class="dot" :class="dot" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  leftValue: { type: Number, required: true },
  rightValue: { type: Number, required: true }
});

const dotPatterns = {
  0: [],
  1: ['center'],
  2: ['top-left', 'bottom-right'],
  3: ['top-left', 'center', 'bottom-right'],
  4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
  5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
  6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
};
</script>

<style scoped>
.domino-card {
  width: 100px;
  height: 200px;
  background: white;
  border-radius: 10px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.half {
  width: 100%;
  height: 50%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  position: relative;
}

.divider {
  width: 100%;
  height: 2px;
  background: black;
}

.dot {
  width: 12px;
  height: 12px;
  background: black;
  border-radius: 50%;
  position: absolute;
}

.top-left { top: 10%; left: 10%; }
.top-right { top: 10%; right: 10%; }
.center { top: 50%; left: 50%; transform: translate(-50%, -50%); }
.middle-left { top: 50%; left: 10%; transform: translateY(-50%); }
.middle-right { top: 50%; right: 10%; transform: translateY(-50%); }
.bottom-left { bottom: 10%; left: 10%; }
.bottom-right { bottom: 10%; right: 10%; }
</style>
