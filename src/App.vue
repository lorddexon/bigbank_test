<template>
  <div id="app">
    <div v-if="gameStatus === 'stopped'"
      class="loading">
      <template v-if="game">
        <p>You have a saved game. Wish to continue?</p>
        <button @click="startGame('continue')">Continue</button>
        <p>or</p>
        <button @click="startGame('new')">Start over</button>
      </template>
      <template v-else>
        <button @click="startGame('new')">Start Adventure</button>
      </template>
    </div>
    <div v-else-if="game" class="dragon">
      <aside>
        <Stats :game="game"/>
        <Shop/>
      </aside>
      <div class="wrapper">
        <Messages/>
        <Logs/>
      </div>
      <Modal/>
    </div>
  </div>
</template>

<script>
import Stats from './components/Stats'
import Shop from './components/Shop'
import Messages from './components/Messages'
import Logs from './components/Logs'
import Modal from './components/Modal.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'DragonQuest',
  components: {
    Shop,
    Messages,
    Logs,
    Stats,
    Modal
  },
  created () {
    this.$store.commit('LOAD_GAME')
  },
  computed: {
    ...mapGetters(['getGame', 'getGameStatus']),
    game () {
      return this.getGame
    },
    gameStatus () {
      return this.getGameStatus
    }
  },
  methods: {
    startGame (gameType) {
      this.$store.dispatch('startGame', gameType)
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap');
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  background:$light-yellow;
  height: 100%;
  color:$grey-dark;
}
* {
  box-sizing: border-box;
}
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
.dragon {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
aside {
  width: 25%;
  min-width: 200px;
  min-height: 500px;
  height: 100vh;
  box-shadow: 0 0 8px $main-color;
  background: $main-color;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.wrapper {
  width: 75%;
}
h2 {
  font-size: 20px;
  margin: -10px auto 10px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color:$grey-dark;
  font-weight: 300;
  text-align: center;
}
button {
  cursor: pointer;
}
</style>
