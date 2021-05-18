<template>
  <el-row class="header" type="flex" align="middle">
    <el-col :lg="2">
      <div class="logo">
        <span>aps</span>
      </div>
    </el-col>
    <el-col :lg="2" :offset="18">
        <el-avatar :size="40" icon="el-icon-user-solid"></el-avatar>
    </el-col>
    <el-col :lg="2">
      <el-button v-if="isAuth" type="primary" @click.prevent="logOut">Выход</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
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
