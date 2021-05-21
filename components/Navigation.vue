<template>
  <el-row type="flex" align="middle" justify="space-between" style="height: 100%">
    <el-col :lg="6">
      <div class="logo">
        <nuxt-link :to="rout === '/admin' ? '/admin' : '/'">ticket manager</nuxt-link>
      </div>
    </el-col>
    <el-col :lg="1">
      <el-dropdown trigger="click">
        <span>
          <el-avatar v-if="isUserAuth.image" :size="40" :src="'/upload' + isUserAuth.image" />
          <el-avatar v-else :size="40" icon="el-icon-user-solid" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button v-if="isAuth" type="primary" @click.prevent="logOut">Выход</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      rout: ''
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters['auth/isAuth']
    },
    isUserAuth () {
      return this.$store.getters['auth/getUser']
    }
  },
  created () {
    this.rout = this.$route.fullPath
  },
  methods: {
    logOut () {
      this.$store.dispatch('auth/LOGOUT')
    }
  }
}
</script>
