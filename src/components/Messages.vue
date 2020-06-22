<template>
  <div class="messages">
    <h2>Messages</h2>
    <div class="messages__wrapper" v-if="groupedMessages">
      <div v-for="(messages, index) in groupedMessages"
        class="messages__column"
        :key="index">
        <div class="messages__turns">{{ messages.turns }}</div>
        <Message
          v-for="(message, index) in messages.messages"
          :message="message"
          :turn="messages.turn"
          :key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Message
  },
  computed: {
    ...mapGetters(['getMessages']),
    groupedMessages () {
      return this.getMessages
    }
  }
}
</script>

<style lang="scss">
  .messages {
    padding: 20px;
    height: 70vh;
    overflow: hidden;
    .message {
      width: 100%;
      border-radius: 5px;
    }
  }
  .messages__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    height: calc(100% - 40px);
  }
  .messages__column {
    width: calc(100% / 7);
    height: 100%;
    position: relative;
    overflow: auto;
    padding: 0 10px;
    border: 1px solid $main-color;
    &:nth-of-type(2n+1) {
      margin: 0 1px;
    }
  }
  .messages__turns {
    text-align: center;
    padding: 10px;
    background:$main-color;
    margin: 10px 0;
    color:$light-yellow;
  }
</style>
