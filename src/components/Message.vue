<template>
  <div v-if="!message.encrypted"
    class="message message__chance"
    :class="{
      'message__chance-low' : gameMessage.chance === 'low',
      'message__chance-middle' : gameMessage.chance === 'middle',
      'message__chance-high' : gameMessage.chance === 'high',
    }">
    <div class="message__info">
      <p class="style-thin">"{{ gameMessage.message }}"</p>
      <p class="small">
        <span>Reward:</span>
        {{ gameMessage.reward }}</p>
      <p class="small">
        <span>Difficulty:</span>
      {{ gameMessage.probability }}</p>
    </div>
    <button class="message__pick"
      @click="pickMessage(message.adId)">Pick</button>
  </div>
</template>

<script>
export default {
  computed: {
    gameMessage () {
      const tempMessage = JSON.parse(JSON.stringify(this.message));
      ['adId', 'encrypted'].forEach(prop => {
        delete tempMessage[prop]
      })
      return tempMessage
    }
  },
  props: {
    message: {
      type: Object,
      required: false
    },
    turn: {
      type: Number,
      required: false
    }
  },
  methods: {
    pickMessage (adId) {
      this.$store.dispatch('pickMessage', adId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .message__chance {
    position: relative;
    padding: 10px 10px 40px;
    background:$grey-light;
    &-low {
      background: $red-light;
    }
    &-middle {
      background: #FECC5B;
    }
    &-high {
      background: $green;
    }
    p {
      margin: 0;
      font-size: 14px;
      &.style-thin {
        font-weight: 300;
        margin-bottom: 10px;
      }
      &.small {
        font-size: 11px;
      }
      span {
        display: block;
        float: left;
        min-width: 50px;
      }
    }
    margin-bottom: 10px;
  }
  .message__pick {
    position: absolute;
    bottom: 10px;
    left: 50%;
    width: 50px;
    transform: translateX(-50%);
  }
</style>
