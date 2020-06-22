import Api from '@/services/Api'
const api = Api()

export default {
  start () {
    return api.post('game/start')
  },
  investigate (game) {
    return api.post(`${game}/investigate/reputation`)
  },
  getMessages (game) {
    return api.get(`${game}/messages`)
  },
  pickMessage (game, messsage) {
    return api.post(`${game}/solve/${messsage}`)
  },
  getShopItems (game) {
    return api.get(`${game}/shop`)
  },
  buyShopItem (game, item) {
    return api.post(`${game}/shop/buy/${item}`)
  }
}
