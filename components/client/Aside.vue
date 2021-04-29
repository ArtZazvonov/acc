<template>
  <div class="aside">
    <div class="aside-control__btn" @click="asideHide()">X</div>
    <div class="aside-menu">
      <div class="aside-menu__item">
        <nuxt-link exact to="ticket/list">Открытые заявки</nuxt-link>
      </div>
      <div class="aside-menu__item">
        <a href="/">Сотрудники</a>
      </div>
      <div class="aside-menu__item">
        <a href="/">Список контактов ДОУ</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    asideHide () {
      this.$store.dispatch('clientUX/ASIDE')
    }
  }
}
</script>

<style lang="scss" scoped>
  .aside{
    position: relative;
    height: 100%;
    &-menu{
      padding-top: 60px;
      padding: 0 10px;
    }
    &-control__btn{
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      border: 1px solid red;
      cursor: pointer;
    }
  }
</style>
