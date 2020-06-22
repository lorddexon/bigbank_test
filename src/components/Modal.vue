<template>
  <div v-if="getModal.status"
    class="overlay">
    <p>{{ message }}<br/>
      <span v-if="getModal.type !== 'looser'"
        @click="closeModal('winner')">Continue<br/></span>
      <span @click="startGame('new')">Start over</span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getModal']),
    message () {
      if (this.getModal.status) {
        if (this.getModal.type === 'winner') {
          return 'You have won! Congratulations!'
        } else if (this.getModal.type === 'looser') {
          return 'You are dead'
        } else {
          return ''
        }
      } else {
        return false
      }
    }
  },
  methods: {
    closeModal (modalType) {
      this.$store.commit('SET_MODAL', {
        status: false,
        type: modalType
      })
    },
    startGame (gameType) {
      this.closeModal(null)
      this.$store.dispatch('startGame', gameType)
    }
  },
  props: {
    mesType: {
      type: Object,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background:rgba(0,0,0,.4);
    display: flex;
    color:$white;
    align-items: center;
    justify-content: center;
    p {
      padding: 20px 40px;
      background: $main-color;
      box-shadow: 0 0 10px $black;
      font-size: 35px;
      border-radius: 5px;
      text-align: center;
      span {
        font-size: 20px;
        border-bottom: 1px solid $white;
        cursor: pointer;
        font-weight: 300;
        &:hover {
          border-bottom: 1px solid transparent;
        }
      }
    }
  }
</style>
