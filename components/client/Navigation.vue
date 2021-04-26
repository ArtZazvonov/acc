<template>
  <header class="header">
    <div class="logo">
      <span>aps</span>
    </div>
    <nav class="navigation">
      <ul>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
      </ul>
    </nav>
    <button v-if="isAuth" type="button" class="app-btn btn-login" @click.prevent="logOut">выход</button>
  </header>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    isAuth () {
      return this.$store.getters['auth/isAuth']
    }
  },
  mounted () {},
  methods: {
    logOut () {
      this.$store.dispatch('auth/LOGOUT')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo{}
  .navigation{
    ul{
      display: flex;
      align-items: center;
      justify-content: space-between;
      list-style: none;
      li{}
    }
  }
  .btn-login{
    align-items: flex-end;
  }
</style>
