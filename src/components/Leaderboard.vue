<script setup>

import { ref, onMounted } from "vue";
import { getLeaderboard } from "../utils/interactions";
import { ethers } from "ethers";
import { account } from "../utils/web3connect";
import Loading from "./Loading.vue";

const players = ref([]);
const isFound = ref(true);
const visible = ref('loading');
const loadingText = ref('Loading...');

onMounted(async () => {
    try {
        const g = await getLeaderboard();
        players.value = g;
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
        🏆 Leaderboard 🏆
    </div>
    <div v-if="visible == 'main'" class="box fullscreen-box">
        <table>
            <thead>
                <tr>
                    <th>Account</th>
                    <th>Games</th>
                    <th>Win</th>
                    <th>Lose</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in players" :key="index">
                    <td>{{ item.player }}</td>
                    <td>{{ item.games }}</td>
                    <td>{{ item.win }}</td>
                    <td>{{ item.lose }}</td>
                </tr>
                
            </tbody>
        </table>
       
    </div>
</template>
<style scoped>
table {
    font-size: 1.5rem;
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}

th,
td {
    padding: 5px;
}

tbody tr {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
    border-top: 1px solid rgb(197, 197, 197);
}
</style>