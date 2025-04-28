<script setup>

import { ref } from 'vue';
import { account } from "./utils/web3connect";
import Wallet from './components/Wallet.vue';
import AllRooms from "./components/AllRooms.vue";
import PlayAndLogo from './components/PlayAndLogo.vue';
import MyRooms from './components/MyRooms.vue';
import CreateRoom from './components/CreateRoom.vue';
import Leaderboard from './components/Leaderboard.vue';
import HowToPlay from "./components/HowToPlay.vue";
import Battle from './components/Battle.vue';
import HistoryBattle from './components/HistoryBattle.vue';

const activeComponent = ref('play');
const idgame = ref(null);

const showComponent = (componentName) => {
  if (account.value != null) {
    activeComponent.value = componentName;
  }
}

const closeComponent = () => {
  activeComponent.value = 'allgames';
};

const closeAndShowPlay = () => {
  activeComponent.value = "play";
};

const playGame = (id) => {
  showComponent("battle");
  idgame.value = id;
}

</script>

<template>
  <PlayAndLogo v-if="activeComponent === 'play'" @close="closeComponent" />
  <AllRooms v-if="activeComponent === 'allgames'" @sendIdGame="playGame"/>
  <MyRooms v-if="activeComponent === 'mygames'" @sendIdGame="playGame"/>
  <HistoryBattle v-if="activeComponent === 'history'" @sendIdGame="playGame"/>
  <CreateRoom v-if="activeComponent === 'create'" @createdSuccess="showComponent('mygames')"/>
  <Leaderboard v-if="activeComponent === 'leaderboard'" />
  <HowToPlay v-if="activeComponent === 'howtoplay'" />
  <Battle v-if="activeComponent === 'battle'" :idgame=idgame />

  <Wallet @play="closeAndShowPlay" />

  <button @click="showComponent('howtoplay')" class="button1 kiribawah"><svg xmlns="http://www.w3.org/2000/svg"
      id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="25" fill="#570eaa">
      <path
        d="M19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5Zm-7,19c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5,.672,1.5,1.5-.672,1.5-1.5,1.5Zm1.928-6.512c-.521,.287-.928,.952-.928,1.512,0,.553-.448,1-1,1s-1-.447-1-1c0-1.284,.807-2.626,1.963-3.264,.763-.42,1.157-1.254,1.004-2.125-.138-.787-.81-1.458-1.596-1.596-.606-.107-1.195,.047-1.656,.435-.455,.381-.715,.94-.715,1.533,0,.552-.448,1-1,1s-1-.448-1-1c0-1.185,.521-2.302,1.429-3.064,.908-.762,2.109-1.077,3.287-.873,1.613,.282,2.938,1.606,3.221,3.22,.298,1.699-.509,3.395-2.009,4.222Z" />
    </svg></button>

  <button @click="showComponent('leaderboard')" class="button1 kiribawah2"><svg xmlns="http://www.w3.org/2000/svg"
      id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="25" fill="#570eaa">
      <path
        d="m17.829,7.762c-.141,0-.282-.045-.4-.133-.227-.17-.321-.464-.236-.734l.627-2.011-1.585-1.29c-.213-.181-.291-.476-.194-.738.096-.262.346-.437.626-.437h2.001l.708-1.987c.097-.261.346-.434.625-.434s.528.173.625.434l.708,1.987h2.001c.28,0,.53.175.626.438s.017.558-.197.739l-1.577,1.285.652,1.987c.089.269-.001.565-.226.738-.225.173-.534.185-.771.031l-1.836-1.196-1.805,1.208c-.112.075-.242.113-.371.113Zm-8,3c-.141,0-.282-.045-.4-.133-.227-.17-.321-.464-.236-.734l.627-2.011-1.585-1.29c-.213-.181-.291-.476-.194-.738.096-.262.346-.437.626-.437h2.001l.708-1.987c.097-.261.346-.434.625-.434s.528.173.625.434l.708,1.987h2.001c.28,0,.53.175.626.438s.017.558-.197.739l-1.577,1.285.652,1.987c.089.269-.001.565-.226.738-.225.173-.534.185-.771.031l-1.836-1.196-1.805,1.208c-.112.075-.242.113-.371.113ZM1.829,13.762c-.141,0-.282-.045-.4-.133-.227-.17-.321-.464-.236-.734l.627-2.011-1.585-1.29c-.213-.181-.291-.476-.194-.738.096-.262.346-.437.626-.437h2.001l.708-1.987c.097-.261.346-.434.625-.434s.528.173.625.434l.708,1.987h2.001c.28,0,.53.175.626.438s.017.558-.197.739l-1.577,1.285.652,1.987c.089.269-.001.565-.226.738-.225.173-.534.185-.771.031l-1.836-1.196-1.805,1.208c-.112.075-.242.113-.371.113Zm19.671-3.762h-2c-1.381,0-2.5,1.119-2.5,2.5v9c0,1.381,1.119,2.5,2.5,2.5h2c1.381,0,2.5-1.119,2.5-2.5v-9c0-1.381-1.119-2.5-2.5-2.5Zm-17.5,6h-1.5c-1.381,0-2.5,1.119-2.5,2.5v3c0,1.381,1.119,2.5,2.5,2.5h1.5c1.381,0,2.5-1.119,2.5-2.5v-3c0-1.381-1.119-2.5-2.5-2.5Zm8.5-3h-1.5c-1.381,0-2.5,1.119-2.5,2.5v6c0,1.381,1.119,2.5,2.5,2.5h1.5c1.381,0,2.5-1.119,2.5-2.5v-6c0-1.381-1.119-2.5-2.5-2.5Z" />
    </svg>
  </button>
  <button @click="showComponent('allgames')" class="button1" style="position: absolute;top: 2rem;left: 2rem;"><svg
      xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="25"
      fill="#570eaa">
      <path
        d="m19,1H5C2.243,1,0,3.243,0,6v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V6c0-2.757-2.243-5-5-5ZM6.5,18.5c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5-.672,1.5-1.5,1.5Zm0-5c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5-.672,1.5-1.5,1.5Zm0-5c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5-.672,1.5-1.5,1.5Zm11.5,9.5h-7c-.552,0-1-.448-1-1s.448-1,1-1h7c.552,0,1,.448,1,1s-.448,1-1,1Zm0-5h-7c-.552,0-1-.448-1-1s.448-1,1-1h7c.552,0,1,.448,1,1s-.448,1-1,1Zm0-5h-7c-.552,0-1-.448-1-1s.448-1,1-1h7c.552,0,1,.448,1,1s-.448,1-1,1Z" />
    </svg>
  </button>
  <button @click="showComponent('mygames')" class="button1" style="position: absolute;top: 2rem;left: 7rem;"><svg
      xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="25"
      fill="#570eaa">
      <path
        d="M21,11h-5c-1.654,0-3,1.346-3,3v7c0,1.654,1.346,3,3,3h5c1.654,0,3-1.346,3-3v-7c0-1.654-1.346-3-3-3Zm-1,9h-3c-.553,0-1-.448-1-1s.447-1,1-1h3c.553,0,1,.448,1,1s-.447,1-1,1Zm0-4.003h-3c-.553,0-1-.448-1-1s.447-1,1-1h3c.553,0,1,.448,1,1s-.447,1-1,1ZM3,6C3,2.691,5.691,0,9,0s6,2.691,6,6-2.691,6-6,6S3,9.309,3,6ZM12.026,24H1c-.557,0-1.001-.46-1-1.017,.009-4.955,4.043-8.983,9-8.983h0c.688,0,1.356,.085,2,.232v6.768c0,1.13,.391,2.162,1.026,3Z" />
    </svg>
  </button>
  <button @click="showComponent('history')" class="button1" style="position: absolute;top: 2rem;left: 12rem;"><svg
      xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="25" height="25"
      fill="#570eaa">
      <path
        d="M12,0A12.032,12.032,0,0,0,3.529,3.529L1,1V6.909A1.09,1.09,0,0,0,2.091,8H8L5.647,5.647A8.985,8.985,0,1,1,3,12H0A12,12,0,1,0,12,0Z" />
      <polygon points="10 7 10 13.621 13.439 17.061 15.561 14.939 13 12.379 13 7 10 7" />
    </svg>
  </button>
  <button @click="showComponent('create')" class="button1" style="position: absolute;top: 2rem;left: 17rem;"><svg
      xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="25"
      fill="#570eaa">
      <path
        d="M19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5Zm-3,13h-3v3c0,.553-.448,1-1,1s-1-.447-1-1v-3h-3c-.552,0-1-.447-1-1s.448-1,1-1h3v-3c0-.553,.448-1,1-1s1,.447,1,1v3h3c.552,0,1,.447,1,1s-.448,1-1,1Z" />
    </svg>
  </button>
  <button @click="showComponent('play');" class="button1" style="position: absolute;bottom: 2rem;right: 2rem;"><svg
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px"
      y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="25"
      height="25" fill="#570eaa">
      <g>
        <path d="M256,319.841c-35.346,0-64,28.654-64,64v128h128v-128C320,348.495,291.346,319.841,256,319.841z" />
        <g>
          <path
            d="M362.667,383.841v128H448c35.346,0,64-28.654,64-64V253.26c0.005-11.083-4.302-21.733-12.011-29.696l-181.29-195.99    c-31.988-34.61-85.976-36.735-120.586-4.747c-1.644,1.52-3.228,3.103-4.747,4.747L12.395,223.5    C4.453,231.496-0.003,242.31,0,253.58v194.261c0,35.346,28.654,64,64,64h85.333v-128c0.399-58.172,47.366-105.676,104.073-107.044    C312.01,275.383,362.22,323.696,362.667,383.841z" />
          <path d="M256,319.841c-35.346,0-64,28.654-64,64v128h128v-128C320,348.495,291.346,319.841,256,319.841z" />
        </g>
      </g>
    </svg>
  </button>
  
</template>

<style scoped></style>
