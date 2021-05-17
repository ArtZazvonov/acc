<template>
  <header class="header">
    <div class="logo">
      <nuxt-link to="/">ticket manager</nuxt-link>
    </div>
    <div v-if="isAuth" class="user-control">
      <div class="user-control__img">
        <i class="icon-user-solid"></i>
      </div>
      <!-- <span class="user-control__name">{{ user.name.first }}</span> -->
      <button type="button" class="btn btn-login" @click.prevent="logOut">выход</button>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    user () {
      return this.$store.getters['auth/getUser']
    },
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

<style lang="scss" scoped></style>
