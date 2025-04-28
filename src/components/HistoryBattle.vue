<script setup>

import { ref, onMounted } from "vue";
import { getGamesByPlayer } from "../utils/interactions";
import { ethers } from "ethers";
import { account } from "../utils/web3connect";
import Loading from "./Loading.vue";

const players = ref([]);
const isFound = ref(true);
const visible = ref('loading');
const loadingText = ref('Loading...');

const emit = defineEmits(['sendIdGame']);
const sendId = (gameid) => {
    emit('sendIdGame', gameid)
}

onMounted(async () => {
    try {
        const g = await getGamesByPlayer(account.value);
        let h = [];
        for (let i = 0; i < g.length; i++) {
            const a = g[i];
            const s = ethers.utils.formatEther(a.stakePerPlayer.toString());
            const idx = Number(a.id);
            let isWin = 'Lose';
            let isDraw = false;

            isWin = a.winner == account.value ? 'Win' : 'Lose';
            isDraw = a.winner == '0x0000000000000000000000000000000000000000' ? true : false;

            let setplayer = "";
            if (a.player1 == account.value) {
                if (a.player2 == "0x0000000000000000000000000000000000000000") {
                    setplayer = ""
                } else {
                    setplayer = a.player2;
                }
            } else {
                setplayer = a.player1;
            }

            if (a.completed == true) {
                h.push({
                    id: idx, address: setplayer, amount: s, status: isWin, draw: isDraw, block: Number(a.joinedAtBlock)
                });
            }

        }

        if (h.length == 0) {
            isFound.value = false;
        }else{
            h.sort((a, b) => b.block - a.block);
        }

        players.value = h;
        visible.value = "main";

    } catch (error) {
        visible.value = "main";
        console.error("Failed to get data:", error);
    }
});

</script>

<template>
    <div class="tengah" v-if="visible == 'loading'">
        <Loading />
        <br>
        <p>{{ loadingText }}</p>
    </div>
    <div
        style="margin-top: 80px;font-size: 24px;text-align: center;font-family: 'Bangers'; font-size: 2.2rem;color: white;">
        My Last Battle
    </div>
    <div class="fullscreen-box">
        <div class="tengah" v-if="isFound == false">No game history.</div>
        <div v-if="visible == 'main'" v-for="(player, index) in players" :key="index" class="box">
            {{ player.address }}
            <button @click="sendId(player.id)" class="button2" style="float: right;"><svg
                    xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                    fill="#fbf8ff" width="20" height="20">
                    <path
                        d="M24,15c-.028,0-2.812,.204-5.328,2.249l4.54,4.539-1.414,1.414-4.54-4.539c-2.05,2.521-2.258,5.309-2.258,5.338h-2c0-.626,.331-2.852,1.695-5.15l-1.28-1.279,4.168-4.165,1.28,1.279c2.292-1.356,4.512-1.686,5.137-1.686v2Zm-1.377-9.457l1.348-4.11c.185-.841-.564-1.59-1.405-1.405l-4.11,1.348L5.137,14.686c-2.292-1.356-4.512-1.686-5.137-1.686v2c.028,0,2.812,.204,5.328,2.249L.788,21.788l1.414,1.414,4.54-4.539c2.05,2.521,2.258,5.309,2.258,5.338h2c0-.626-.331-2.852-1.695-5.15L22.623,5.543ZM1.377,5.543l5.04,5.036,4.168-4.165L5.543,1.377,1.433,.028C.592-.157-.157,.592,.028,1.433L1.377,5.543Z" />
                </svg>
                CHECK RESULT</button>
            <button class="button2" style="float: right; background-color: #cb33ff;">{{ player.amount }}</button>
            <button class="button2" style="float: right; background-color:rgb(95, 95, 95);">{{ isDraw != true ?
                player.status : 'Draw' }}</button>
            <button class="button2" style="float: right; background-color:rgb(233, 206, 0);">ID: {{ player.id
                }}</button>
        </div>
    </div>
</template>