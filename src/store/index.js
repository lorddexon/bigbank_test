import Vue from 'vue'
import Vuex from 'vuex'
import GameService from '@/services/GameService'
import customSort from '@/services/Sorting'
import DateTime from '@/services/DateTime'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: null,
    gameStatus: 'stopped',
    messages: null,
    shopItems: null,
    logs: [],
    modal: {
      status: false,
      type: null
    }
  },
  getters: {
    getGame: state => {
      return state.game
    },
    getGameStatus: state => {
      return state.gameStatus
    },
    getMessages: state => {
      if (state.messages != null) {
        // apply difficulty of solving, based on probability
        const tempMessages = JSON.parse(JSON.stringify(state.messages))
        for (const message of tempMessages) {
          Object.entries(CHANCES).find(chance => {
            chance[1].find(ch => {
              if (ch === message.probability) {
                message.chance = chance[0]
                return true
              }
            })
          })
        }
        // grouping messages by remaining turns and sort by difficulty
        const groupedMessages = [...Array(7).keys()].map(n => {
          return {
            turns: n + 1,
            messages: []
          }
        })
        let turnsRemaining = 1
        let arraySize = 0
        customSort({ data: tempMessages, sortField: 'chance' })
        for (let i = 0; i < tempMessages.length; i++) {
          turnsRemaining = 1
          arraySize = 0
          while (tempMessages[i].expiresIn !== turnsRemaining) {
            arraySize++
            turnsRemaining++
          }
          groupedMessages[arraySize].messages.push(tempMessages[i])
        }
        return groupedMessages
      }
    },
    getShopItems: state => {
      return state.shopItems
    },
    getLogs: state => {
      return state.logs
    },
    getModal: state => {
      return state.modal
    }
  },
  mutations: {
    LOAD_GAME (state) {
      state.game = JSON.parse(localStorage.getItem('dragonGame')) || null
    },
    SAVE_GAME (state) {
      localStorage.setItem('game', JSON.stringify(state.game))
    },
    SET_GAME_STATUS (state, gameStatus) {
      state.gameStatus = gameStatus
    },
    SET_MODAL (state, modal) {
      state.modal = modal
    }
  },
  actions: {
    startGame ({ state, commit }, gameType) {
      if (gameType === 'new') {
        GameService.start().then(response => {
          state.game = response.data
          this.dispatch('getShopItems')
          this.dispatch('getMessages')
        })
      } else if (gameType === 'continue') {
        state.game = JSON.parse(localStorage.getItem('dragonGame'))
        this.dispatch('getShopItems')
        this.dispatch('getMessages')
      }
      commit('SET_GAME_STATUS', 'ongoing')
      commit('SET_MODAL', {
        type: null,
        status: false
      })
      state.logs = []
      state.logs.push({
        log: 'Nice, now you can pick tasks and try not to die!',
        status: 'true',
        time: DateTime()
      })
    },
    saveGame ({ state }, gameStatus) {
      if (gameStatus) {
        localStorage.setItem('dragonGame', JSON.stringify(state.game))
      } else {
        localStorage.removeItem('dragonGame')
      }
    },
    getMessages ({ state }, gameStatus = true) {
      GameService.getMessages(state.game.gameId).then(response => {
        state.messages = response.data
        this.dispatch('saveGame', gameStatus)
      })
    },
    skipTurn ({ state }) {
      GameService.buyShopItem(state.game.gameId, 'skip').then(response => {
        if (state.game.lives > 0) {
          this.dispatch('getMessages')
        }
      })
    },
    pickMessage ({ state, commit }, message) {
      GameService.pickMessage(state.game.gameId, message).then(response => {
        state.logs.push({
          log: response.data.message,
          status: response.data.success,
          time: DateTime()
        })
        Object.assign(state.game, {
          lives: response.data.lives,
          gold: response.data.gold,
          score: response.data.score,
          turn: response.data.turn
        })
        if (state.game.lives > 0) {
          this.dispatch('getMessages')
          if (state.game.score >= 1000 && state.modal.type !== 'winner') {
            commit('SET_MODAL', {
              type: 'winner',
              status: true
            })
          }
        } else if (state.game.lives === 0) {
          this.dispatch('saveGame', false)
          commit('SET_MODAL', {
            type: 'looser',
            status: true
          })
        }
      })
    },
    getShopItems ({ state }) {
      GameService.getShopItems(state.game.gameId).then(response => {
        state.shopItems = response.data
        if (state.game.lives > 0) {
          this.dispatch('getMessages')
        }
      })
    },
    buyShopItem ({ state }, item) {
      // prevent skipping turn by fake purchasing of item
      if (item.cost > state.game.gold) {
        state.logs.push({
          log: 'You do not have enough gold',
          status: false,
          time: DateTime()
        })
        return false
      }
      GameService.buyShopItem(state.game.gameId, item.id).then(response => {
        state.logs.push({
          log: response.data.shoppingSuccess ? 'Item has been bought. You have become stronger!' : 'Item has not been bought for some reason...',
          status: response.data.shoppingSuccess,
          time: DateTime()
        })
        Object.assign(state.game, {
          lives: response.data.lives,
          gold: response.data.gold,
          level: response.data.level,
          turn: response.data.turn
        })
        if (state.game.lives > 0) {
          this.dispatch('getMessages')
        }
      })
    }
  }
})

// have no ideas how many probabilities exist, so I specified most common of them
const CHANCES = {
  low: ['Playing with fire', 'Suicide mission', 'Impossible', 'Rather detrimental'],
  middle: ['Hmmm....', 'Gamble', 'Risky', 'Sure thing'],
  high: ['Piece of cake', 'Walk in the park', 'Quite likely']
}
