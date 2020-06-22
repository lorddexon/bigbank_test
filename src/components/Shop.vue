<template>
  <div class="shop">
    <h2>Shop</h2>
    <div class="shop__items">
      <ShopItem v-for="(item, index) in shopItems"
        :item="item"
        :key="index"/>
    </div>
  </div>
</template>

<script>
import ShopItem from './ShopItem.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    ShopItem
  },
  computed: {
    ...mapGetters(['getShopItems']),
    shopItems () {
      return this.getShopItems
    }
  }
}
</script>

<style lang="scss">
  .shop {
    padding: 20px;
    margin: 20px;
    background:$light-yellow;
    height: calc(100% - 285px);
    border-radius: 5px;
  }
  .shop__items {
    font-size: 13px;
    position: relative;
    height: calc(100% - 60px);
    padding: 10px;
    margin-left: -10px;
    overflow: auto;
  }
</style>
