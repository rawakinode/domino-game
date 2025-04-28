<template>
  <div class="domino-card">
    <img class="logomonad" src="/public/monad.svg" alt="">
  </div>
</template>

<script setup>

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

.top-left { top: 10%; left: 10%; }
.top-right { top: 10%; right: 10%; }
.center { top: 50%; left: 50%; transform: translate(-50%, -50%); }
.middle-left { top: 50%; left: 10%; transform: translateY(-50%); }
.middle-right { top: 50%; right: 10%; transform: translateY(-50%); }
.bottom-left { bottom: 10%; left: 10%; }
.bottom-right { bottom: 10%; right: 10%; }
</style>
