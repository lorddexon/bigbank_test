<template>
  <div class="logs"
    :class="{'logs-multiple' : logs.length > 1}">
    <h2>Logs</h2>
    <div class="logs__wrapper"
      ref="logs">
      <p v-for="(message, index) in logs"
        :key="index"
        :class="{'error' : !message.status}">
        <span>[{{ message.time }}]:</span>
        {{ message.log }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getLogs']),
    logs () {
      if (this.$refs.logs) {
        this.scrollBottom()
      }
      return this.getLogs
    }
  },
  methods: {
    scrollBottom () {
      this.$nextTick(() => {
        this.$refs.logs.scrollTop = 0
      })
    }
  }
}
</script>

<style lang="scss">
  .logs {
    height: 30vh;
    padding: 20px;
    position: relative;
    background: $main-color;
    color: $light-yellow;
    h2 {
      height: 40px;
      color: $light-yellow;
    }
    &-multiple {
      &:after {
        position: absolute;
        bottom: 20px;
        height: 15px;
        left: 10px;
        width: 95%;
        content: "";
        background: linear-gradient(0deg, $main-color 0%, rgba(255, 0, 0, 0) 100%);
      }
    }
  }
  .logs__wrapper {
    position: relative;
    overflow: auto;
    height: calc(100% - 40px);
    display: flex;
    flex-direction: column-reverse;
    p {
      margin: 0 0 10px;
      font-weight: 300;
      font-size: 13px;
      opacity: 0.8;
      border-bottom: 1px solid transparent;
      span {
        font-weight: 300;
        font-size: 12px;
        display: block;
        float: left;
        min-width: 145px;
      }
      &.error {
        color: $red-light;
      }
      &:last-child {
        opacity: 1;
        font-size: 14px;
        border-bottom: 1px solid;
        float: left;
        width: calc(100% - 20px);
      }
    }
  }
</style>
