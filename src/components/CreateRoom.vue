<script setup>
import { ref } from "vue";
import { createRoom } from "../utils/interactions";
import Loading from "./Loading.vue";

const emit = defineEmits(['createdSuccess']);
const sendId = () => {
    emit('createdSuccess')
}

const selectedTier = ref(null);
const loadingView = ref(false);
const loadingText = ref('Waiting for transaction...');

const selectTier = (tier) => {
  selectedTier.value = tier;
};

const create = async () => {
  try {
    loadingView.value = true;
    if (selectedTier) {
        const b = await createRoom(selectedTier.value);
        console.log(b);
        
        if (b) {
          console.log("B terpenuhi");
            sendId();
        }
    }
    loadingView.value = false;
  } catch (error) {
    loadingView.value = false;
  }
    
}

</script>

<template>
  <div style="margin-top: 80px; font-size: 24px; text-align: center; font-family: 'Bangers'; font-size: 2.2rem; color: white;">
    Create Games
  </div>
  <div style="font-family: 'Bangers'; font-size: 1.5rem; color: #ffed00; text-align: center;">Select your bet amount</div>

  <div style="display: flex; justify-content: center; margin-top: 2rem;">
    <div
      v-for="tier in [0.01, 0.1, 0.5, 1, 2, 5, 10]"
      :key="tier"
      :class="['tier', { selected: selectedTier === tier }]"
      @click="selectTier(tier)"
    >
      {{ tier }}
      <img class="logomonad" src="/public/monad.svg" alt="">
    </div>
  </div>

  <div style="display: block; text-align: center; margin-top: 2rem;">
    <button v-if="selectedTier != null && loadingView != true" @click="create" class="button1">Create</button><br>
    <div v-if="loadingView == true">
      <Loading /><br>
      <p>{{ loadingText }}</p>
    </div>
  </div>
  
</template>

<style scoped>
.tier {
  padding: 10px;
  margin: 5px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border 0.3s ease;
}

.tier.selected {
  border: 5px solid rgb(0, 0, 0);
}

.logomonad {
  position: relative;
  top: 4px;
  left: 5px;
}
</style>
