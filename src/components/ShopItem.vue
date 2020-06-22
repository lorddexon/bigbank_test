<template>
  <div class="shop__item">
    <div>
      <div v-for="(stat, name, index) in shopItem"
        class="shop__item-info"
        :key="index">
        <span class="shop__item-label">{{ name | capitalize}}: </span>
        <span class="shop__item-value">{{ stat }}</span>
      </div>
    </div>
    <button @click="buyShopItem(item)">Buy</button>
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
  computed: {
    shopItem () {
      const tempItem = JSON.parse(JSON.stringify(this.item))
      delete tempItem.id
      return tempItem
    }
  },
  props: {
    item: {
      type: Object,
      required: false
    }
  },
  methods: {
    buyShopItem (item) {
      this.$store.dispatch('buyShopItem', item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop__item {
    padding: 5px;
    margin-left: -5px;
    transition: all 0.1s;
    &:last-child {
      border-bottom: 0;
    }
    &:hover {
      box-shadow: 0 0 1px $main-color;
    }
  }
  .shop__item, .shop__item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
    &-info {
      align-items: flex-start;
      justify-content: flex-start;
      margin-bottom: 0;
    }
  }
  .shop__item-value {
    color:#5A9078;
    font-weight: 600;
  }
  .shop__item-label {
    font-weight: 300;
    font-size: 11px;
    min-width: 50px;
    display: block;
  }
</style>
