<template>
  <el-row class="header" type="flex" align="middle">
    <el-col :lg="2">
      <div class="logo">
        <span>aps</span>
      </div>
    </el-col>
    <el-col :lg="2" :offset="20">
      <button v-if="isAuth" type="button" class="app-btn btn-login" @click.prevent="logOut">выход</button>
    </el-col>
  </el-row>
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
  methods: {
    logOut () {
      this.$store.dispatch('auth/LOGOUT')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    height: 100%;
  }
</style>
