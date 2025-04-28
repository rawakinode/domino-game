<template>
    <div class="tengah">
        <img src="/public/logo2.png" alt="" height="300px"><br>
        <button v-if="account" @click="emit('close')" class="button1"> <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24"
                width="25" height="25" fill="#570eaa">
                <path
                    d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z" />
            </svg> PLAY</button>
            <button v-else class="button1">PLEASE CONNECT</button>
            <div>Created by <span><a style="color: rgb(255 253 0);" href="https://github.com/rawakinode/">Rawakinode</a></span></div>
    </div>
</template>

<script setup>
import { account } from "../utils/web3connect";

const emit = defineEmits(['close']);

</script>