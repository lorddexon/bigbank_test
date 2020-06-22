<template>
  <div class="stats">
    <h2>Stats</h2>
    <div class="stats__info">
      <div v-for="(stat, name, index) in game"
        :key="index"
        class="stat">
        <span class="stat__label">{{ name | capitalize}}:</span>
        <span class="stat__value"
          :class="{'score' : name === 'score'}"
          :style="{
            'background': name === 'score' ? `linear-gradient(90deg,
              rgba(90,144,120,1) ${(parseFloat(stat / 1000 * 100))}%,
              rgba(255,255,255,0) ${(parseFloat(stat / 1000 * 100))}%)` : ''
          }">{{ stat }}{{name === 'score' ? '/1000':''}}</span>
      </div>
    </div>
    <div class="settings">
      <span @click="startGame('new')">Start new game</span>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    capitalize: name => {
      if (!name) {
        return ''
      }
      name = name.toString()
      return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
    }
  },
  props: {
    game: {
      type: Object,
      required: false
    }
  },
  methods: {
    startGame (gameType) {
      this.$store.dispatch('startGame', gameType)
    }
  }
}
</script>

<style lang="scss" scoped>
  .stats {
    padding: 20px;
    margin: 20px;
    background:$light-yellow;
    height: 30vh;
    height: 225px;
    border-radius: 5px;
    position: relative;
  }
  .stats__info {
    height: calc(100% - 40px);
    min-height: auto;
    position: relative;
    overflow: auto;
  }
  .stat {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 13px;
    margin-bottom: 5px;
  }
  .stat__label {
    display: block;
    min-width: 100px;
  }
  .stat__value {
    font-weight: bold;
    &.score {
      width: calc(100% - 120px);
      border: 1px solid $green;
      text-align: center;
    }
  }
  .settings {
    position: absolute;
    top: 60px;
    right: 20px;
    font-size: 13px;
    border-bottom: 1px solid;
    &:hover {
      border-bottom: 1px solid transparent;
      cursor: pointer;
    }
  }
</style>
