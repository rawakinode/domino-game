<template>
    <div class="tengah" v-if="visible == 'loading'">
        <Loading />
        <br>
        <p>{{ loadingText }}</p>
    </div>
    <div class="tengah" v-if="visible == 'main'">
        <div class="battle-detail">ID: {{ props.idgame }}</div>
        <div class="battle-detail">Bet: {{ betAmount }} Monad</div>
        <div class="battle-detail" style="margin-bottom: 1.5rem;">Opponent: {{ opponent }}</div>
        <!-- <div class="bangers" style="font-size: 2.2rem;">BATTLE</div> -->
        <div style="display: flex;justify-content: center;">
            <Card v-if="isJoined == true" :left-value="p1c1Top" :right-value="p1c1Bottom" style="margin-right: 1rem;" />
            <Card v-if="isJoined == true" :left-value="p1c2Top" :right-value="p1c2Bottom" />
            <BackCard v-if="isJoined == false" style="margin-right: 1rem;" />
            <BackCard v-if="isJoined == false" />
            <div style="margin: 90px;">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                    fill="#fbf8ff" width="40" height="40">
                    <path
                        d="M24,15c-.028,0-2.812,.204-5.328,2.249l4.54,4.539-1.414,1.414-4.54-4.539c-2.05,2.521-2.258,5.309-2.258,5.338h-2c0-.626,.331-2.852,1.695-5.15l-1.28-1.279,4.168-4.165,1.28,1.279c2.292-1.356,4.512-1.686,5.137-1.686v2Zm-1.377-9.457l1.348-4.11c.185-.841-.564-1.59-1.405-1.405l-4.11,1.348L5.137,14.686c-2.292-1.356-4.512-1.686-5.137-1.686v2c.028,0,2.812,.204,5.328,2.249L.788,21.788l1.414,1.414,4.54-4.539c2.05,2.521,2.258,5.309,2.258,5.338h2c0-.626-.331-2.852-1.695-5.15L22.623,5.543ZM1.377,5.543l5.04,5.036,4.168-4.165L5.543,1.377,1.433,.028C.592-.157-.157,.592,.028,1.433L1.377,5.543Z" />
                </svg>
            </div>
            <Card v-if="isGameCompleted == true" :left-value="p2c1Top" :right-value="p2c1Bottom"
                style="margin-right: 1rem;" />
            <Card v-if="isGameCompleted == true" :left-value="p2c2Top" :right-value="p2c2Bottom" />
            <BackCard v-if="isGameCompleted == false" style="margin-right: 1rem;" />
            <BackCard v-if="isGameCompleted == false" />
        </div>

        <div style="display: flex;justify-content: center;margin-top: -10px;">
            <div style="position: relative;right: 9rem;">
                <div class="battle-detail">Your Card</div>
            </div>
            <div style="position: relative;left: 11rem;">
                <div class="battle-detail">Opponent Card</div>
            </div>
        </div>

        <div>
            <!-- <button class="button1">OPEN CARD</button> -->
            <button v-if="isPlayerConfirmed == false" @click="continueGame" class="button1">CONTINUE</button>
            <button v-if="isPlayerConfirmed == false" @click="surrender" class="button1">SURRENDER <svg
                    xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25"
                    height="25" fill="#570eaa">
                    <path
                        d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm3.707,14.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-2.293,2.293,2.293,2.293Z" />
                </svg></button>
            <button v-if="isBothPlayerConfirmed == true && isGameCompleted == false" @click="finish"
                class="button1">FINISH GAME</button><br>
            <div v-if="isGameCompleted == true && isWinner == true && isDraw == false" class="battle-detail">🎉 Congratulation! You are Winner.</div>
            <div v-if="isGameCompleted == true && isWinner == false && isDraw == false" class="battle-detail">😢 Unfortunately, You Lose!</div>
            <div v-if="isGameCompleted == true && isDraw == true" class="battle-detail">🤝 Game Draw!</div>

        </div>
        <Loading v-if="loadingView" /><br>
        <p v-if="loadingView">{{ loadingText }}</p>
    </div>

</template>

<script setup>
const props = defineProps({
    idgame: Number
});

import { getGamesById, getCard, confirmContinue, surrenderGame, finishGame, getCardGameCompleted, sleep } from "../utils/interactions";
import { ref, onMounted } from "vue";
import { account } from "../utils/web3connect";
import Card from "./Card.vue";
import BackCard from './BackCard.vue';
import { getBlockNumber } from "../utils/interactions";
import Loading from './Loading.vue';
import { ethers } from "ethers";

const visible = ref('loading');
const loadingView = ref(false);
const loadingText = ref('Loading game...');
const betAmount = ref(0);
const isGameCompleted = ref(false);
const isSurrender = ref(false);
const isPlayerOne = ref(false);
const isPlayerConfirmed = ref(false);
const isBothPlayerConfirmed = ref(false);
const isJoined = ref(false);
const p1c1Top = ref();
const p1c1Bottom = ref();
const p1c2Top = ref();
const p1c2Bottom = ref();
const p2c1Top = ref();
const p2c1Bottom = ref();
const p2c2Top = ref();
const p2c2Bottom = ref();
const opponent = ref('');
const isWinner = ref(false);
const isDraw = ref(false);

const check = async () => {
    try {
        loadingView.value = false;
        const a = await getGamesById(props.idgame);
        console.log(a);
        
        isPlayerOne.value = a.player1.toLowerCase() == account.value ? true : false;
        opponent.value = a.player1.toLowerCase() == account.value ? a.player2.toLowerCase() : a.player1.toLowerCase();
        betAmount.value = ethers.utils.formatEther(a.stakePerPlayer.toString());
        if (a.player2 != '0x0000000000000000000000000000000000000000') {

            const c = await getCard(props.idgame);
            const blockNow = await getBlockNumber(props.idgame);
            const blockGame = Number(a.joinedAtBlock.toString()) + 172800;
            
            p1c1Top.value = c[0].left;
            p1c1Bottom.value = c[0].right;
            p1c2Top.value = c[1].left;
            p1c2Bottom.value = c[1].right;

            isJoined.value = true;

            

            if (isPlayerOne.value == true) {
                isPlayerConfirmed.value = a.p1Confirmed;
            } else {
                isPlayerConfirmed.value = a.p2Confirmed;
            }

            if (isPlayerConfirmed.value == true) {
                loadingView.value = true;
                loadingText.value = "Waiting for opponent confirmed."
            }

            if (a.p1Confirmed == true && a.p2Confirmed == true) {
                isBothPlayerConfirmed.value = true;
                loadingView.value = false;
            }

            if (blockNow > blockGame) {
                isPlayerConfirmed.value = true;
                isBothPlayerConfirmed.value = true;
                console.log("Game expired");
                
            }
            
            isGameCompleted.value = a.completed;
            if (isGameCompleted.value == true) {
                isWinner.value = a.winner == account.value ? true : false;
                isDraw.value = a.winner == '0x0000000000000000000000000000000000000000' ? true : false;
                const p2 = a.player1 == account.value ? a.player2 : a.player1;
                const x = await getCardGameCompleted(props.idgame, p2);
                p2c1Top.value = x[0].left;
                p2c1Bottom.value = x[0].right;
                p2c2Top.value = x[1].left;
                p2c2Bottom.value = x[1].right;
            }
            ;
            
            visible.value = 'main';

        } else {
            loadingText.value = "Waiting for opponent..."
        }
    } catch (error) {
        console.log(error);
        
        alert("Failed to get data game!")
    }
}

const continueGame = async () => {
    try {
        loadingView.value = true;
        isPlayerConfirmed.value = true; 
        loadingText.value = "Waiting for transaction confirmed."
        const a = await confirmContinue(props.idgame);
        if (a) {
            await check();
        }else{
            isPlayerConfirmed.value = false;
            loadingView.value = false;
        }
    } catch (error) {
        loadingView.value = false;
        isPlayerConfirmed.value = false; 
        alert("Failed to continue game!");
    }
}

const surrender = async () => {
    try {
        loadingView.value = true;
        isPlayerConfirmed.value = true;
        loadingText.value = "Waiting for transaction confirmed."
        const a = await surrenderGame(props.idgame);
        if (a) {
            await check();
        }else{
            isPlayerConfirmed.value = false;
            loadingView.value = false;
        }
        
    } catch (error) {
        loadingView.value = false;
        isPlayerConfirmed.value = false; 
        alert("Failed to surrended!")
    }
}

const finish = async () => {
    try {
        loadingView.value = true;
        isBothPlayerConfirmed.value = false;
        loadingText.value = "Waiting for transaction confirmed."
        const a = await finishGame(props.idgame);
        if (a) {
            await check();
        }else{
            loadingView.value = false;
            isBothPlayerConfirmed.value = true;
        }
    } catch (error) {
        isBothPlayerConfirmed.value = true;
        loadingView.value = false;
        alert("Failed to finish!");
    }
}

onMounted(async () => {
   await check();
});


</script>
